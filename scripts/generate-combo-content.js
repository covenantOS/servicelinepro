#!/usr/bin/env node
/**
 * Generates service-area combo markdown files.
 * 8 services x 15 areas = 120 combo pages.
 * Each page: 600-1000 words, unique content per combination.
 */

import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

const config = YAML.parse(fs.readFileSync('./site.config.yaml', 'utf8'));
const outDir = 'src/content/service-areas';

// Ensure output directory exists
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Area-specific details for richer content
const areaDetails = {
  'topeka-ks': {
    name: 'Topeka',
    desc: 'the capital city of Kansas',
    housing: 'housing stock spanning 130+ years, from 1890s Victorians to 2020s new construction',
    character: 'Topeka offers diverse neighborhoods with distinct architectural character, from the brick streets of North Topeka to the newer developments along Wanamaker Road',
    considerations: 'Topeka building permits are required for most structural projects. The City of Topeka Planning and Development Department at 620 SE Madison handles all residential permits and inspections.'
  },
  'north-topeka-ks': {
    name: 'North Topeka',
    desc: 'the revitalized community north of the Kansas River',
    housing: 'Craftsman bungalows, Victorians, and post-war ranches from the 1920s through the 1960s',
    character: 'North Topeka is experiencing a renaissance centered around the NOTO Arts and Entertainment District, with increasing homeowner investment in the surrounding residential streets',
    considerations: 'Some North Topeka properties near the Kansas River and Soldier Creek fall within FEMA flood zones. Kingdom Builders Co. verifies flood zone status before starting any ground-level construction.'
  },
  'westboro-topeka-ks': {
    name: 'Westboro',
    desc: 'an established neighborhood in central-west Topeka',
    housing: '1950s-1960s ranch and split-level homes on generous lots with mature trees',
    character: 'Westboro is a stable, well-maintained neighborhood where homeowners invest in updates that bring mid-century homes up to modern standards',
    considerations: 'Westboro homes often have original 100-amp electrical panels, galvanized plumbing, and compact kitchen layouts. Ryan Felix evaluates these conditions during every estimate.'
  },
  'college-hill-topeka-ks': {
    name: 'College Hill',
    desc: "one of Topeka's premier historic neighborhoods near Washburn University",
    housing: '1910s-1940s Craftsman, Tudor Revival, and Colonial Revival homes with plaster walls, hardwood floors, and ornate woodwork',
    character: 'College Hill features tree-lined streets, brick sidewalks, and some of the finest residential architecture in Topeka. The neighborhood demands craftsmanship that respects original character',
    considerations: 'Older homes in College Hill may have galvanized steel plumbing, knob-and-tube wiring, and cast iron drain lines. Ryan Felix identifies and addresses these conditions during every remodeling project.'
  },
  'potwin-place-topeka-ks': {
    name: 'Potwin Place',
    desc: "Topeka's oldest planned neighborhood, listed on the National Register of Historic Places",
    housing: '1880s-1920s Queen Anne, Folk Victorian, and Craftsman homes with original woodwork and character details',
    character: 'Potwin Place is a nationally recognized historic district where remodeling requires sensitivity to architectural preservation while updating for modern living',
    considerations: 'Exterior modifications in Potwin Place may be subject to historic review. Interior remodeling is not restricted. Kingdom Builders Co. navigates these requirements for every project.'
  },
  'collins-park-topeka-ks': {
    name: 'Collins Park',
    desc: 'a residential neighborhood in south-central Topeka',
    housing: '1950s-1970s ranch and split-level homes ranging from 1,000 to 1,600 square feet',
    character: 'Collins Park offers affordable homeownership with homes that benefit significantly from targeted remodeling and outdoor improvements',
    considerations: 'Collins Park homes are well-suited for value-adding improvements. The affordable price range means remodeling investment produces strong percentage returns.'
  },
  'holliday-park-topeka-ks': {
    name: 'Holliday Park',
    desc: 'an established neighborhood in central-south Topeka near Gage Boulevard',
    housing: '1940s-1970s ranches, Cape Cods, and split-levels on moderate lots with mature landscaping',
    character: 'Holliday Park has a stable ownership base that takes pride in maintaining and improving their homes',
    considerations: 'Mature trees in Holliday Park require careful placement of outdoor structures to avoid root damage. Ryan Felix evaluates tree proximity during every project estimate.'
  },
  'oakland-topeka-ks': {
    name: 'Oakland',
    desc: 'a community in east-central Topeka near Lake Shawnee',
    housing: '1930s-1960s Craftsman cottages, post-war ranches, and Cape Cod designs from 800 to 1,400 square feet',
    character: 'Oakland is a working-class neighborhood with solid, affordable homes on quiet streets close to Lake Shawnee and the recreational trail system',
    considerations: 'The flat terrain and clay soil in Oakland require attention to drainage for any ground-level construction. Deck footings and fence posts must be set deep in concrete.'
  },
  'sherwood-park-topeka-ks': {
    name: 'Sherwood Park',
    desc: 'a quality neighborhood in SW Topeka near Burlingame Road',
    housing: '1960s-1970s ranch and split-level homes from 1,400 to 2,200 square feet with full basements',
    character: 'Sherwood Park is known for stable property values, pride of ownership, and well-maintained homes on generous lots',
    considerations: 'Sherwood Park lots are flat to gently rolling with adequate space for substantial outdoor construction. The full basements in most homes provide excellent finishing potential.'
  },
  'silver-lake-ks': {
    name: 'Silver Lake',
    desc: 'a small community 15 minutes west of Topeka along US-24',
    housing: 'a mix of historic town homes, 1970s-1990s ranches, and newer construction on larger lots',
    character: 'Silver Lake combines small-town character with proximity to Topeka, anchored by the well-regarded Silver Lake USD 372 school district',
    considerations: 'Newer Silver Lake properties on larger lots allow for substantial outdoor construction projects. Older homes in the town grid benefit from kitchen, bathroom, and flooring updates.'
  },
  'rossville-ks': {
    name: 'Rossville',
    desc: 'a small town 20 minutes northwest of Topeka along US-24',
    housing: 'original town homes from the early 1900s, mid-century ranches, and newer construction on larger lots',
    character: 'Rossville offers rural living with a close-knit community feel, served by the Kaw Valley USD 321 school district',
    considerations: 'Many Rossville properties sit on half-acre to multi-acre parcels, providing space for large-footprint outdoor structures and extended fence runs.'
  },
  'auburn-ks': {
    name: 'Auburn',
    desc: 'a growing community 15 minutes south of Topeka along US-75',
    housing: 'newer subdivisions with 1,600-3,000+ sq ft homes, older ranches, and rural-residential properties',
    character: 'The Auburn-Washburn school district is one of the most sought-after in the Topeka metro area, drawing families and driving residential growth',
    considerations: 'Newer Auburn homes often have walkout basements, making elevated deck construction a natural addition. Builder-grade finishes in these homes benefit from personalization and upgrades.'
  },
  'wakarusa-ks': {
    name: 'Wakarusa',
    desc: 'a rural-residential area in southwest Shawnee County',
    housing: 'newer custom homes, established ranch properties, and subdivisions from the 1980s-2000s on larger lots',
    character: 'The Wakarusa area offers open terrain, scenic views, and larger lot sizes that give homeowners room for substantial outdoor construction',
    considerations: 'Properties in the Wakarusa area often have adequate space for full outdoor entertainment zones: covered patios, outdoor kitchens, fire pits, and connected structures.'
  },
  'dover-ks': {
    name: 'Dover',
    desc: 'a small rural community in western Shawnee County along K-4 Highway',
    housing: 'original farmhouses, 1970s-1990s ranch homes, and newer custom-built homes on rural parcels',
    character: 'Dover offers quiet rural living with properties ranging from 1 to 40+ acres, surrounded by Kansas agricultural land',
    considerations: 'Dover properties on acreage provide space for large decks, extended fence runs, and outdoor living areas. The rolling terrain often benefits from elevated deck construction.'
  },
  'shawnee-county-ks': {
    name: 'Shawnee County',
    desc: 'the full county including Topeka and all surrounding communities',
    housing: 'diverse housing from urban historic homes to rural properties on acreage',
    character: 'Shawnee County covers 556 square miles and includes every community Kingdom Builders Co. serves. All projects within the county are covered with no mileage surcharges',
    considerations: 'Building codes and permits are administered by the City of Topeka within city limits and by Shawnee County for unincorporated areas. Kingdom Builders Co. works with both jurisdictions.'
  }
};

// Service-specific content generators
const serviceContent = {
  'deck-building': {
    name: 'Deck Building',
    getIntro: (area) => `Ryan Felix and Kingdom Builders Co. build custom decks for homeowners in ${area.name}. The ${area.housing} in this area create specific deck design opportunities. Whether you need a ground-level platform, an elevated deck off a walkout basement, or a multi-level entertainment space, Kingdom Builders Co. designs and builds it to match your home and your backyard.`,
    getBody: (area) => `## Deck Building Services in ${area.name}

${area.character}. Ryan Felix visits every ${area.name} property in person to evaluate the yard, discuss design preferences, and provide a detailed written estimate.

### Materials We Install

**Composite Decking** from Trex Transcend and TimberTech AZEK provides a low-maintenance surface that handles Kansas weather without annual staining. Composite decks run **$30-$60 per square foot** installed. These products carry 25-50 year warranties against fading, staining, and structural defect.

**Pressure-Treated Wood** is the most affordable option at **$15-$25 per square foot** installed. Pressure-treated pine requires staining every 2-3 years in the Kansas climate but provides a solid, proven deck surface.

**Western Red Cedar** provides natural beauty and rot resistance at **$25-$40 per square foot** installed. Cedar weathers gracefully and takes stain beautifully.

### What Every ${area.name} Deck Includes

Every deck Kingdom Builders Co. builds in ${area.name} includes footings dug to 42 inches minimum (below the 36-inch Kansas frost line), pressure-treated #1 grade framing lumber, Simpson Strong-Tie connectors at all structural joints, joist tape on all framing members, and your choice of decking material and railing system.

### Local Considerations

${area.considerations}

### Pricing for ${area.name} Deck Projects

A basic 12x12 pressure-treated deck starts at **$3,500**. A mid-range 14x16 composite deck with aluminum railings runs **$8,000-$12,000**. Premium multi-level designs with lighting, built-in seating, and pergola integration start at **$15,000**.

## Get Your Free Deck Estimate in ${area.name}

Call Ryan Felix at **(785) 329-4551** or submit the estimate form. Free on-site consultations for all ${area.name} homeowners.`,
    getDescription: (area) => `Custom deck building in ${area.name} by Kingdom Builders Co. Composite, cedar, and pressure-treated decks. Call Ryan Felix for a free estimate.`
  },

  'fence-installation': {
    name: 'Fence Installation',
    getIntro: (area) => `Kingdom Builders Co. installs residential and light commercial fencing for homeowners in ${area.name}. Ryan Felix evaluates your property line, discusses material options, and provides a per-linear-foot estimate that covers posts, concrete, panels, hardware, and cleanup.`,
    getBody: (area) => `## Fence Installation Services in ${area.name}

${area.character}. Ryan Felix visits every ${area.name} property to walk the fence line, identify utility easements, and recommend materials that suit the lot and the home.

### Fence Types Available

**Wood Privacy Fencing** in cedar or pressure-treated pine provides full privacy at **$25-$45 per linear foot** installed. Board-on-board construction adds a finished look on both sides and reduces wind load.

**Vinyl Fencing** eliminates all maintenance at **$30-$55 per linear foot** installed. ActiveYards, Bufftech, and Homeland Vinyl panels carry lifetime warranties.

**Chain Link Fencing** offers affordable enclosure at **$15-$25 per linear foot** installed. Available in galvanized or vinyl-coated finishes.

**Ornamental Aluminum Fencing** adds a polished appearance at **$40-$75 per linear foot** installed. Powder-coated finish requires no painting.

### Installation Standards

Every fence Kingdom Builders Co. installs in ${area.name} includes posts set in concrete at 30 inches minimum depth, 8-foot post spacing for wind resistance, and a minimum of one walk gate with self-closing hinges.

### Local Considerations

${area.considerations}

Before digging any post hole, Kingdom Builders Co. calls 811 (Kansas One-Call) to mark all underground utilities. We handle the fence permit application with the appropriate jurisdiction.

## Get Your Free Fence Estimate in ${area.name}

Call Ryan Felix at **(785) 329-4551** or submit the estimate form. Free on-site consultations for all ${area.name} homeowners.`,
    getDescription: (area) => `Professional fence installation in ${area.name} by Kingdom Builders Co. Wood, vinyl, chain link, and ornamental. Call Ryan Felix for a free estimate.`
  },

  'bathroom-remodeling': {
    name: 'Bathroom Remodeling',
    getIntro: (area) => `Kingdom Builders Co. remodels bathrooms for homeowners in ${area.name}. Ryan Felix handles every project from initial estimate through final walkthrough, with in-house crews managing demolition, plumbing, electrical, tile, cabinetry, and finish work.`,
    getBody: (area) => `## Bathroom Remodeling Services in ${area.name}

The ${area.housing} in ${area.name} present specific bathroom remodeling opportunities. ${area.character}.

### Remodel Options

**Budget Refresh ($5,000-$10,000)**: New vanity, fixtures, lighting, paint, and hardware on the existing layout. No plumbing relocation, no tile work. Ideal for bathrooms with sound structure that need a cosmetic update.

**Full Remodel ($10,000-$25,000)**: Complete demolition to studs, new waterproof membrane (Schluter KERDI or DITRA), floor-to-ceiling tile, new vanity with stone or quartz top, new toilet, all new fixtures, updated lighting, and exhaust fan upgrade.

**Luxury Master Bath ($25,000-$45,000)**: Frameless glass shower, freestanding tub, heated tile floors (Schluter DITRA-HEAT), double vanity, premium tile and stone, and custom details.

### Waterproofing Standard

Every shower and tub area Kingdom Builders Co. installs receives a Schluter waterproof membrane system. This prevents the mold, rot, and structural damage that shortcuts cause within 3-5 years. We do not rely on paint-on waterproofing alone.

### Local Considerations

${area.considerations}

### Brands We Install

Tile: DalTile, MSI, Florida Tile. Fixtures: Kohler, Moen, Delta. Vanities: KraftMaid, Bertch. Countertops: Cambria, Silestone quartz, granite slab.

## Get Your Free Bathroom Remodel Estimate in ${area.name}

Call Ryan Felix at **(785) 329-4551** or submit the estimate form. Free on-site consultations for all ${area.name} homeowners.`,
    getDescription: (area) => `Bathroom remodeling in ${area.name} by Kingdom Builders Co. Full renovations from demolition to final trim. Call Ryan Felix for a free estimate.`
  },

  'kitchen-remodeling': {
    name: 'Kitchen Remodeling',
    getIntro: (area) => `Kingdom Builders Co. remodels kitchens for homeowners in ${area.name}. Ryan Felix coordinates all trades in-house: demolition, framing, electrical, plumbing, cabinetry, countertops, tile, flooring, and paint. One contract. One crew. One point of contact.`,
    getBody: (area) => `## Kitchen Remodeling Services in ${area.name}

The ${area.housing} in ${area.name} create specific kitchen remodeling opportunities. ${area.character}.

### Kitchen Remodel Options

**Minor Refresh ($8,000-$15,000)**: Cabinet refacing, new countertops, backsplash, hardware, and updated fixtures. Keeps the existing layout and plumbing.

**Mid-Range Remodel ($15,000-$35,000)**: New cabinets, countertops, flooring, backsplash, lighting, and updated appliance hookups. May include minor layout changes.

**Premium Full Kitchen ($35,000-$65,000)**: Custom cabinetry, stone countertops, hardwood or tile flooring, island addition, full electrical and plumbing upgrades.

### Countertop Materials

**Quartz** (Cambria, Silestone, LG Viatera): $50-$120/sq ft installed. Non-porous, no sealing, 25+ year performance.
**Granite**: $40-$100/sq ft installed. Natural stone character, annual sealing.
**Butcher Block**: $30-$60/sq ft installed. Warm wood aesthetic, requires oiling.

### Cabinet Options

**Stock Cabinets** (Diamond, Hampton Bay): $5,000-$12,000 for a typical kitchen. 1-3 week lead time.
**Semi-Custom** (KraftMaid, Bertch): $10,000-$22,000. More door styles, finish options, and accessories. 4-8 week lead time.
**Custom Cabinets**: $20,000-$40,000+. Built to exact specifications. 8-14 week lead time.

### Local Considerations

${area.considerations}

## Get Your Free Kitchen Remodel Estimate in ${area.name}

Call Ryan Felix at **(785) 329-4551** or submit the estimate form. Free on-site consultations for all ${area.name} homeowners.`,
    getDescription: (area) => `Kitchen remodeling in ${area.name} by Kingdom Builders Co. Cabinets, countertops, flooring, and full renovations. Call Ryan Felix for a free estimate.`
  },

  'flooring': {
    name: 'Flooring Installation',
    getIntro: (area) => `Kingdom Builders Co. installs residential flooring for homeowners in ${area.name}. Ryan Felix evaluates subfloor condition, tests moisture levels on concrete, and recommends flooring products that perform in Kansas conditions.`,
    getBody: (area) => `## Flooring Installation Services in ${area.name}

The ${area.housing} in ${area.name} present specific flooring considerations. ${area.character}.

### Flooring Options

**Luxury Vinyl Plank (LVP)** is the top-performing flooring for Kansas homes. Waterproof, dimensionally stable, and realistic. Brands: COREtec, Shaw Floorte, Mohawk RevWood. Installed cost: **$5-$12 per square foot**.

**Hardwood Flooring** provides authentic wood character. Solid hardwood (3/4-inch oak, hickory, walnut) at **$8-$18/sq ft** installed. Engineered hardwood at **$7-$15/sq ft** installed. Engineered is the better choice for Kansas humidity swings.

**Tile Flooring** (porcelain and ceramic) for kitchens, bathrooms, and entryways at **$10-$20/sq ft** installed. DalTile, MSI, and Florida Tile brands.

**Laminate Flooring** provides a budget-friendly option at **$4-$8/sq ft** installed. Not recommended for moisture-prone areas.

### Subfloor Preparation

Kingdom Builders Co. evaluates every subfloor before installation. We test concrete moisture with calcium chloride tests, level wood subfloors to within 3/16 inch over 10 feet, and install proper underlayment for each flooring type.

### Local Considerations

${area.considerations}

### What Is Included

Every flooring estimate from Kingdom Builders Co. includes old flooring removal, subfloor preparation, underlayment, flooring material, all transitions and trim, furniture moving, and cleanup. One price. No add-ons.

## Get Your Free Flooring Estimate in ${area.name}

Call Ryan Felix at **(785) 329-4551** or submit the estimate form. Free on-site consultations for all ${area.name} homeowners.`,
    getDescription: (area) => `Flooring installation in ${area.name} by Kingdom Builders Co. Hardwood, LVP, tile, and laminate. Call Ryan Felix for a free estimate.`
  },

  'outdoor-living': {
    name: 'Outdoor Living Spaces',
    getIntro: (area) => `Kingdom Builders Co. designs and builds outdoor living spaces for homeowners in ${area.name}. Ryan Felix handles patios, pergolas, outdoor kitchens, and fire pit areas from design through construction with a single in-house crew.`,
    getBody: (area) => `## Outdoor Living Spaces in ${area.name}

${area.character}. Ryan Felix evaluates every ${area.name} property for sun exposure, wind patterns, drainage, and how the outdoor space connects to the home's interior.

### Paver Patios

Concrete pavers from Belgard, Pavestone, and EP Henry installed on a compacted 6-8 inch gravel base with polymeric sand joints. Running bond, herringbone, and basketweave patterns available. Paver patios run **$12-$22 per square foot** installed. Natural stone patios (flagstone, bluestone) run **$15-$35 per square foot**.

### Pergolas

Western Red Cedar and pressure-treated Douglas Fir pergolas provide filtered shade and define outdoor rooms. Attached or freestanding designs from 10x12 to 16x20. Cedar pergolas run **$6,000-$15,000** installed.

### Outdoor Kitchens

Built-in grill, countertop, storage, and optional sink, refrigerator, and bar seating. Stone veneer or stucco exterior with granite or concrete countertops. Outdoor kitchens start at **$8,000** for a basic grill station and run to **$30,000** for a full kitchen with plumbed utilities.

### Fire Pit Areas

Wood-burning or gas-fired fire pits with stone or block construction and surrounding paver or flagstone seating area. Fire pit packages run **$2,000-$8,000**.

### Local Considerations

${area.considerations}

### Low-Voltage Lighting

LED landscape lighting integrated into patios, pergolas, and walkways extends outdoor use after dark. Lighting packages run **$1,500-$4,000**.

## Get Your Free Outdoor Living Estimate in ${area.name}

Call Ryan Felix at **(785) 329-4551** or submit the estimate form. Free on-site consultations for all ${area.name} homeowners.`,
    getDescription: (area) => `Custom outdoor living spaces in ${area.name} by Kingdom Builders Co. Patios, pergolas, outdoor kitchens, and fire pits. Free estimates.`
  },

  'general-contractor': {
    name: 'General Contractor',
    getIntro: (area) => `Kingdom Builders Co. provides general contracting services for homeowners in ${area.name}. Ryan Felix manages multi-trade projects including home additions, structural repairs, basement finishing, and whole-home renovations under a single contract.`,
    getBody: (area) => `## General Contractor Services in ${area.name}

The ${area.housing} in ${area.name} create specific general contracting needs. ${area.character}.

### Services

**Home Additions**: Room additions, bump-outs, sunrooms, and garage conversions. Ground-level additions run **$150-$250 per square foot** for finished, climate-controlled space.

**Structural Repairs**: Foundation crack repair, joist sistering, beam replacement, and load-bearing wall modification. Ryan Felix evaluates existing structure and coordinates engineering when required.

**Basement Finishing**: Full basement finishing with framing, insulation, electrical, flooring, and bathroom rough-in. Costs run **$25-$50 per square foot**.

**Whole-Home Renovation**: Complete renovation of all living spaces under a single phased contract. Costs run **$50-$150 per square foot** depending on scope and finish level.

### How We Work

Ryan Felix manages every general contracting project personally. He coordinates all trades (framing, electrical, plumbing, HVAC, drywall, flooring, painting, and finish carpentry), handles permitting, schedules inspections, and maintains quality control throughout.

### Local Considerations

${area.considerations}

Kingdom Builders Co. provides fixed-price contracts with line-item detail. You see the cost for every trade and every material category. Nothing is added to your bill without your approval.

## Get Your Free General Contractor Estimate in ${area.name}

Call Ryan Felix at **(785) 329-4551** or submit the estimate form. Free on-site consultations for all ${area.name} homeowners.`,
    getDescription: (area) => `General contractor in ${area.name}. Home additions, renovations, and structural repairs by Kingdom Builders Co. Call Ryan Felix for a free estimate.`
  },

  'home-remodeling': {
    name: 'Home Remodeling',
    getIntro: (area) => `Kingdom Builders Co. provides comprehensive home remodeling services for homeowners in ${area.name}. Ryan Felix handles single-room updates and whole-house renovations with the same attention to detail: thorough evaluation, honest pricing, and on-site management from start to finish.`,
    getBody: (area) => `## Home Remodeling Services in ${area.name}

The ${area.housing} in ${area.name} present specific remodeling opportunities and challenges. ${area.character}.

### Remodeling Options

**Single Room Remodel ($8,000-$25,000)**: Kitchen, bathroom, bedroom, or living room updated with new finishes, fixtures, and surfaces.

**Multi-Room Remodel ($25,000-$75,000)**: Two or three rooms remodeled together for cost efficiency. Shared mobilization, material ordering, and crew scheduling reduce per-room cost.

**Whole-House Remodel ($75,000-$200,000+)**: Complete renovation of all living spaces. Kitchen, bathrooms, flooring, paint, lighting, and targeted mechanical upgrades throughout the home.

**Basement Finishing ($25,000-$50,000)**: Full finishing with framing, insulation, drywall, flooring, electrical, and bathroom.

### Our Approach

Ryan Felix evaluates every home before quoting. He checks structural condition, plumbing type, wiring age, insulation levels, and foundation status. This evaluation produces an estimate that accounts for what is behind the walls, not an optimistic number that grows after demolition.

### Local Considerations

${area.considerations}

### Phased Construction

Large remodeling projects are divided into phases so your household can function during construction. Each phase has a defined scope, timeline, and completion milestone. You always have access to a bathroom, a sleeping area, and a temporary kitchen setup.

## Get Your Free Remodeling Estimate in ${area.name}

Call Ryan Felix at **(785) 329-4551** or submit the estimate form. Free on-site consultations for all ${area.name} homeowners.`,
    getDescription: (area) => `Home remodeling in ${area.name} by Kingdom Builders Co. Kitchens, bathrooms, basements, and whole-house renovations. Call Ryan Felix for a free estimate.`
  }
};

// Generate all combo pages
let count = 0;
for (const service of config.services) {
  const svc = serviceContent[service.slug];
  if (!svc) {
    console.warn(`No content template for service: ${service.slug}`);
    continue;
  }

  for (const area of config.areas) {
    const areaInfo = areaDetails[area.slug];
    if (!areaInfo) {
      console.warn(`No area details for: ${area.slug}`);
      continue;
    }

    const filename = `${service.slug}-${area.slug}.md`;
    const filepath = path.join(outDir, filename);

    const title = `${svc.name} in ${areaInfo.name}, KS | Kingdom Builders Co.`;
    const description = svc.getDescription(areaInfo);
    const intro = svc.getIntro(areaInfo);
    const body = svc.getBody(areaInfo);

    const content = `---
title: "${title}"
description: "${description}"
service: "${service.slug}"
area: "${area.slug}"
---

${intro}

${body}
`;

    fs.writeFileSync(filepath, content, 'utf8');
    count++;
  }
}

console.log(`Generated ${count} service-area combo pages in ${outDir}/`);
