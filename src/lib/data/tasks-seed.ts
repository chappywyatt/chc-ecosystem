/**
 * Task Master Database Seed Data
 * Army Chaplain Corps Tasks - Collective and Individual
 *
 * Doctrinally aligned with FM 3-83, AR 165-1, ADP 6-22, ATP 1-05.01,
 * ATP 1-05.02, ATP 1-05.03, ATP 1-05.04, and related publications.
 */

export const TASKS_SEED = [
  // =====================================================================
  // COLLECTIVE TASKS - BATTALION ECHELON
  // =====================================================================
  {
    id: "16-BN-3801",
    title: "Provide Religious Support to a Battalion",
    echelon: "battalion",
    task_type: "collective",
    conditions:
      "Given a battalion-size unit in a field or garrison environment, a Unit Ministry Team (UMT) consisting of a Chaplain (56A) and Religious Affairs Specialist (56M), access to the battalion commander and staff, a religious support operations plan, and applicable doctrinal references.",
    standards:
      "Religious support is provided to 100% of assigned and attached personnel within the battalion area of operations. The UMT conducts worship services, pastoral counseling, advisement, and battlefield circulation IAW FM 3-83 and AR 165-1. All religious support activities are synchronized with the battalion operations timeline.",
    performance_steps: [
      {
        step_number: 1,
        description: "Assess the religious support requirements of the battalion.",
        sub_steps: [
          "Conduct a unit needs assessment to identify the religious demographics and support requirements of assigned personnel.",
          "Review the unit manning roster and identify religious preference data from personnel records.",
          "Coordinate with company-level leadership to determine specific unit support needs.",
        ],
      },
      {
        step_number: 2,
        description: "Develop and publish a religious support schedule.",
        sub_steps: [
          "Synchronize religious support activities with the battalion operations calendar and training schedule.",
          "Publish a religious support schedule that accounts for worship services, counseling availability, and battlefield circulation.",
          "Distribute the schedule to all subordinate units through established communication channels.",
        ],
      },
      {
        step_number: 3,
        description: "Execute religious support operations across the battalion area.",
        sub_steps: [
          "Conduct worship services, religious education, and rites/sacraments/ordinances as required.",
          "Perform battlefield circulation to provide pastoral presence in subordinate unit locations.",
          "Provide pastoral counseling and crisis intervention as needed.",
        ],
      },
      {
        step_number: 4,
        description: "Report and assess religious support effectiveness.",
        sub_steps: [
          "Track and report religious support activities using the unit status report format.",
          "Conduct after-action reviews of religious support operations.",
          "Adjust the religious support plan based on assessment findings and commander guidance.",
        ],
      },
    ],
    doctrinal_source: ["FM 3-83", "AR 165-1", "ATP 1-05.01", "ATP 1-05.04"],
    bft_capability_mapping: ["Provide Religious Support", "Perform/Provide RS"],
    pillar_mapping: ["character", "connection"],
    has_teo: true,
    teo_gap_notes: null,
  },
  {
    id: "16-BN-3802",
    title: "Integrate UMT Operations into the Command Post",
    echelon: "battalion",
    task_type: "collective",
    conditions:
      "Given a battalion tactical operations center (TOC) or command post in a field environment, a UMT with communications equipment, current operations overlay, and access to the common operating picture (COP).",
    standards:
      "The UMT integrates into the command post within 30 minutes of TOC establishment. The Chaplain participates in the military decision-making process (MDMP), provides running estimates, and maintains situational awareness of the religious support environment. UMT products are posted and updated on the COP IAW FM 3-83.",
    performance_steps: [
      {
        step_number: 1,
        description: "Establish UMT presence in the command post.",
        sub_steps: [
          "Set up UMT workspace with required communications equipment and reference materials.",
          "Establish connectivity to the battalion common operating picture and information systems.",
          "Coordinate workspace allocation with the S3 and signal officer.",
        ],
      },
      {
        step_number: 2,
        description: "Participate in the military decision-making process.",
        sub_steps: [
          "Provide the religious support running estimate during mission analysis.",
          "Identify religious and cultural factors that may affect operations in the area of operations.",
          "Develop the religious support annex to the operations order.",
        ],
      },
      {
        step_number: 3,
        description: "Maintain situational awareness and provide updates.",
        sub_steps: [
          "Monitor operations and update the religious support overlay as the situation develops.",
          "Provide periodic updates to the commander and staff on religious support status.",
          "Coordinate with the S1 on casualty information and personnel status affecting religious support.",
        ],
      },
      {
        step_number: 4,
        description: "Synchronize UMT operations with the operations timeline.",
        sub_steps: [
          "Align religious support activities with phased operations and key events.",
          "Deconflict UMT movement with maneuver and fires.",
        ],
      },
    ],
    doctrinal_source: ["FM 3-83", "ATP 1-05.01", "FM 6-0", "ADP 5-0"],
    bft_capability_mapping: [
      "Advise the Commander",
      "Perform/Provide RS",
    ],
    pillar_mapping: ["competence", "connection"],
    has_teo: true,
    teo_gap_notes: null,
  },
  {
    id: "16-BN-3804",
    title: "Conduct Religious Support Area Operations",
    echelon: "battalion",
    task_type: "collective",
    conditions:
      "Given a designated religious support area (RSA) within the battalion area of operations, a UMT with organic equipment, RSA supplies (religious supplies kit, field altar, seating, lighting), security provisions, and a published operations order.",
    standards:
      "The RSA is established within two hours of occupation of the battalion area of operations. The site provides a secure, accessible location for worship services, counseling, and religious activities. The RSA meets force protection requirements IAW the unit tactical SOP and FM 3-83.",
    performance_steps: [
      {
        step_number: 1,
        description: "Select and prepare the Religious Support Area site.",
        sub_steps: [
          "Conduct a site reconnaissance considering accessibility, security, cover and concealment, and proximity to supported units.",
          "Coordinate RSA location with the S3 for approval and integration into the operations overlay.",
          "Prepare the site with required equipment including field altar, seating, and lighting.",
        ],
      },
      {
        step_number: 2,
        description: "Establish security and force protection measures for the RSA.",
        sub_steps: [
          "Coordinate security with the unit security plan and the Religious Affairs Specialist.",
          "Establish entry and exit points, personnel accountability, and communications.",
          "Rehearse RSA displacement and alternate site procedures.",
        ],
      },
      {
        step_number: 3,
        description: "Operate and maintain the RSA.",
        sub_steps: [
          "Conduct scheduled worship services, rites, and counseling sessions.",
          "Maintain RSA equipment and supplies to sustain continuous operations.",
          "Coordinate with the S4 for resupply of expendable religious supplies.",
        ],
      },
    ],
    doctrinal_source: ["FM 3-83", "ATP 1-05.01", "ATP 1-05.04"],
    bft_capability_mapping: [
      "Provide Religious Support",
      "Perform/Provide RS",
    ],
    pillar_mapping: ["character", "connection"],
    has_teo: true,
    teo_gap_notes: null,
  },
  {
    id: "16-BN-3807",
    title: "Conduct MASCAL Religious Support Operations",
    echelon: "battalion",
    task_type: "collective",
    conditions:
      "Given a mass casualty (MASCAL) event within the battalion area of operations, a UMT, the unit MASCAL plan, casualty collection points, and coordination with medical personnel and the S1.",
    standards:
      "The UMT provides religious support at all casualty collection points within 60 minutes of MASCAL declaration. Chaplain provides ministry of presence, pastoral care, and last rites as appropriate. The Religious Affairs Specialist maintains accountability and coordinates with mortuary affairs. All actions comply with AR 165-1 and FM 3-83.",
    performance_steps: [
      {
        step_number: 1,
        description: "Activate UMT MASCAL procedures.",
        sub_steps: [
          "Receive MASCAL notification and execute UMT MASCAL SOP.",
          "Coordinate movement to the designated casualty collection point or medical treatment facility.",
          "Establish communication with the battalion surgeon and S1.",
        ],
      },
      {
        step_number: 2,
        description: "Provide religious support to casualties and their units.",
        sub_steps: [
          "Provide ministry of presence, prayer, and pastoral care to the wounded and dying.",
          "Administer appropriate rites, sacraments, or ordinances based on the faith tradition of the casualty.",
          "Support triage operations by providing comfort and de-escalating anxiety among casualties.",
        ],
      },
      {
        step_number: 3,
        description: "Support unit recovery and reconstitution after the MASCAL event.",
        sub_steps: [
          "Assist the commander with unit morale and cohesion through pastoral presence.",
          "Conduct critical event debriefings and facilitate referrals to behavioral health assets.",
          "Coordinate memorial activities and ceremonies as directed.",
        ],
      },
      {
        step_number: 4,
        description: "Document and report MASCAL religious support activities.",
        sub_steps: [
          "Record all religious support activities conducted during the MASCAL event.",
          "Submit required reports to the brigade UMT and S1.",
        ],
      },
    ],
    doctrinal_source: ["FM 3-83", "ATP 1-05.02", "ATP 4-02", "AR 165-1"],
    bft_capability_mapping: [
      "Care for the Living and Wounded",
      "Provide Religious Support",
      "Perform/Provide RS",
    ],
    pillar_mapping: ["character", "competence", "connection"],
    has_teo: true,
    teo_gap_notes: null,
  },
  {
    id: "16-BN-0001",
    title: "Provide Unit Ministry Team Training",
    echelon: "battalion",
    task_type: "collective",
    conditions:
      "Given a UMT assigned to a battalion, access to training areas and facilities, training ammunition and supplies as required, a published training schedule, and the unit training plan.",
    standards:
      "The UMT executes all required individual and collective training tasks IAW the unit training plan and the Chaplain Corps training strategy. UMT members maintain proficiency in all critical task areas. Training is documented in the Digital Training Management System (DTMS) and supports the battalion commander's training objectives.",
    performance_steps: [
      {
        step_number: 1,
        description: "Develop the UMT training plan.",
        sub_steps: [
          "Conduct a training needs analysis based on METL, mission requirements, and individual skills assessment.",
          "Develop a UMT training plan synchronized with the battalion training calendar.",
          "Identify resource requirements including training areas, ammunition, and external support.",
        ],
      },
      {
        step_number: 2,
        description: "Conduct UMT collective training.",
        sub_steps: [
          "Execute UMT tactical training including RSA operations, MASCAL procedures, and displacement drills.",
          "Conduct battle drills for convoy operations, react to contact, and UMT survivability.",
          "Integrate UMT training with battalion collective training events.",
        ],
      },
      {
        step_number: 3,
        description: "Evaluate and document training proficiency.",
        sub_steps: [
          "Evaluate UMT task proficiency using established training and evaluation outlines (T&EOs).",
          "Record training results in DTMS and update the unit training status.",
          "Develop a retraining plan for tasks assessed as needing improvement.",
        ],
      },
    ],
    doctrinal_source: ["FM 3-83", "FM 7-0", "AR 165-1", "ATP 1-05.01"],
    bft_capability_mapping: ["Provide Religious Support", "Perform/Provide RS"],
    pillar_mapping: ["competence", "character"],
    has_teo: true,
    teo_gap_notes: null,
  },

  // =====================================================================
  // COLLECTIVE TASKS - BRIGADE ECHELON
  // =====================================================================
  {
    id: "16-BDE-4000",
    title: "Coordinate Brigade Religious Support Operations",
    echelon: "brigade",
    task_type: "collective",
    conditions:
      "Given a brigade combat team (BCT) or functional brigade in a field or garrison environment, a brigade UMT, subordinate battalion UMTs, the brigade operations order, and access to the brigade commander and staff.",
    standards:
      "The brigade UMT coordinates religious support across all subordinate battalions. Religious support operations are synchronized with brigade operations. The brigade Chaplain provides staff oversight, coordination, and technical supervision to all subordinate UMTs IAW FM 3-83 and AR 165-1.",
    performance_steps: [
      {
        step_number: 1,
        description: "Assess brigade-wide religious support requirements.",
        sub_steps: [
          "Collect religious support status reports from subordinate battalion UMTs.",
          "Analyze the brigade religious demographics and identify gaps in religious support coverage.",
          "Coordinate with the division UMT for additional denominational support as needed.",
        ],
      },
      {
        step_number: 2,
        description: "Develop and issue the brigade religious support plan.",
        sub_steps: [
          "Prepare the religious support annex to the brigade OPORD.",
          "Issue guidance and priorities for religious support to subordinate UMTs.",
          "Synchronize religious support operations with the brigade synchronization matrix.",
        ],
      },
      {
        step_number: 3,
        description: "Supervise and coordinate execution of religious support operations.",
        sub_steps: [
          "Monitor subordinate UMT operations through reports and battlefield circulation.",
          "Coordinate cross-leveling of UMT assets to meet operational requirements.",
          "Resolve religious support issues elevated from battalion level.",
        ],
      },
      {
        step_number: 4,
        description: "Evaluate brigade religious support effectiveness.",
        sub_steps: [
          "Conduct periodic assessments of subordinate UMT performance.",
          "Report brigade religious support status to the division UMT.",
        ],
      },
    ],
    doctrinal_source: ["FM 3-83", "AR 165-1", "ATP 1-05.01", "ADP 3-0"],
    bft_capability_mapping: [
      "Advise the Commander",
      "Provide Religious Support",
      "Perform/Provide RS",
    ],
    pillar_mapping: ["competence", "connection"],
    has_teo: true,
    teo_gap_notes: null,
  },
  {
    id: "16-BDE-4001",
    title: "Plan Brigade Religious Support",
    echelon: "brigade",
    task_type: "collective",
    conditions:
      "Given a brigade-level planning requirement, the brigade MDMP process, a brigade UMT, access to intelligence products and the common operating picture, religious demographics data, and applicable doctrinal references.",
    standards:
      "The brigade Chaplain participates in all steps of the MDMP. The religious support estimate is completed and briefed during mission analysis. The religious support annex is published with the OPORD. Religious and cultural factors are identified and integrated into the operational planning process IAW FM 3-83 and FM 6-0.",
    performance_steps: [
      {
        step_number: 1,
        description: "Conduct religious support mission analysis.",
        sub_steps: [
          "Analyze the higher headquarters order for religious support implications.",
          "Develop the initial religious support estimate including terrain, population, and cultural considerations.",
          "Brief the commander on religious and cultural factors affecting the mission.",
        ],
      },
      {
        step_number: 2,
        description: "Develop religious support courses of action.",
        sub_steps: [
          "Develop religious support options aligned with each brigade course of action.",
          "Identify UMT positioning, movement, and support priorities for each phase of the operation.",
          "Coordinate with the S1, S4, and surgeon for logistics, personnel, and medical support integration.",
        ],
      },
      {
        step_number: 3,
        description: "Prepare and publish the religious support annex.",
        sub_steps: [
          "Draft the religious support annex IAW the OPORD format.",
          "Include task organization of UMT assets, priorities of support, and coordinating instructions.",
          "Coordinate the annex with the brigade staff and publish with the OPORD.",
        ],
      },
    ],
    doctrinal_source: ["FM 3-83", "FM 6-0", "ADP 5-0", "ATP 1-05.01"],
    bft_capability_mapping: ["Advise the Commander", "Perform/Provide RS"],
    pillar_mapping: ["competence", "constitutional"],
    has_teo: true,
    teo_gap_notes: null,
  },
  {
    id: "16-BDE-4800",
    title: "Conduct MASCAL Religious Support at Brigade Level",
    echelon: "brigade",
    task_type: "collective",
    conditions:
      "Given a mass casualty event affecting multiple battalions within the brigade area of operations, a brigade UMT, subordinate UMTs, the brigade MASCAL plan, medical evacuation assets, and coordination with the brigade surgeon and S1.",
    standards:
      "The brigade UMT coordinates religious support across all MASCAL sites within the brigade AO. Subordinate UMTs are directed to reinforce affected areas. Religious support is provided at all casualty collection points, medical treatment facilities, and mortuary affairs collection points within 90 minutes of MASCAL declaration. All actions are IAW FM 3-83 and ATP 1-05.02.",
    performance_steps: [
      {
        step_number: 1,
        description: "Coordinate brigade-level MASCAL religious support response.",
        sub_steps: [
          "Receive MASCAL notification and activate the brigade UMT MASCAL SOP.",
          "Direct subordinate UMTs to support affected casualty collection points.",
          "Coordinate additional UMT support from adjacent units or higher headquarters as needed.",
        ],
      },
      {
        step_number: 2,
        description: "Supervise religious support at multiple MASCAL sites.",
        sub_steps: [
          "Monitor subordinate UMT operations at all casualty sites through communications and reports.",
          "Cross-level UMT assets to ensure coverage at priority locations.",
          "Coordinate with the brigade surgeon on casualty flow and religious support requirements.",
        ],
      },
      {
        step_number: 3,
        description: "Direct post-MASCAL recovery religious support operations.",
        sub_steps: [
          "Coordinate unit-level memorial ceremonies and grief support.",
          "Facilitate referrals to behavioral health and community support resources.",
          "Report MASCAL religious support activities to the division UMT.",
        ],
      },
    ],
    doctrinal_source: ["FM 3-83", "ATP 1-05.02", "ATP 4-02", "AR 165-1"],
    bft_capability_mapping: [
      "Care for the Living and Wounded",
      "Provide Religious Support",
    ],
    pillar_mapping: ["character", "competence", "connection"],
    has_teo: true,
    teo_gap_notes: null,
  },
  {
    id: "16-BDE-6305",
    title: "Coordinate Religious Support During Stability Operations",
    echelon: "brigade",
    task_type: "collective",
    conditions:
      "Given a brigade conducting stability operations in a joint, interagency, or multinational environment, a brigade UMT, access to civil affairs and information operations staff, local religious leader engagement data, and the brigade stability operations plan.",
    standards:
      "The brigade UMT provides religious advisement to the commander on the religious dynamics of the operational environment. The Chaplain conducts or facilitates religious leader engagement (RLE) as authorized. Religious support to Soldiers is maintained while supporting stability operations objectives. All activities are IAW FM 3-83, FM 3-07, and AR 165-1.",
    performance_steps: [
      {
        step_number: 1,
        description: "Assess the religious dynamics of the operational environment.",
        sub_steps: [
          "Conduct a religious area analysis (RAA) of the area of operations.",
          "Identify key religious leaders, institutions, and dynamics that may affect stability operations.",
          "Brief the commander on religious factors influencing the stability environment.",
        ],
      },
      {
        step_number: 2,
        description: "Coordinate religious leader engagement activities.",
        sub_steps: [
          "Develop a religious leader engagement plan coordinated with civil affairs and the S9.",
          "Conduct or facilitate meetings with local religious leaders as authorized by the commander.",
          "Report engagement outcomes and update the religious dynamics assessment.",
        ],
      },
      {
        step_number: 3,
        description: "Maintain religious support to Soldiers during stability operations.",
        sub_steps: [
          "Ensure UMT presence at forward operating bases and combat outposts.",
          "Adjust religious support schedules to accommodate the operational tempo of stability operations.",
          "Monitor Soldier morale and provide pastoral care tailored to the stability operations environment.",
        ],
      },
      {
        step_number: 4,
        description: "Integrate religious support into stability operations assessments.",
        sub_steps: [
          "Contribute to the brigade assessment framework with religious environment indicators.",
          "Provide periodic updates on the religious climate in the area of operations.",
        ],
      },
    ],
    doctrinal_source: ["FM 3-83", "FM 3-07", "ATP 1-05.03", "AR 165-1"],
    bft_capability_mapping: [
      "Advise the Commander",
      "Provide Religious Support",
    ],
    pillar_mapping: ["competence", "constitutional", "connection"],
    has_teo: true,
    teo_gap_notes: null,
  },
  {
    id: "16-BDE-4300",
    title: "Manage Religious Support Logistics at Brigade",
    echelon: "brigade",
    task_type: "collective",
    conditions:
      "Given a brigade UMT, the brigade sustainment plan, access to the S4 and brigade support battalion (BSB), a religious supplies inventory, and coordination with subordinate UMTs for supply requirements.",
    standards:
      "Religious supplies are maintained at or above 80% of authorized levels across the brigade. Resupply requests are processed within 48 hours. Expendable religious supplies (communion elements, religious literature, candles, etc.) are distributed to subordinate UMTs based on requirements. All logistics actions are IAW AR 165-1 and the brigade sustainment SOP.",
    performance_steps: [
      {
        step_number: 1,
        description: "Assess brigade-wide religious supply requirements.",
        sub_steps: [
          "Collect supply status reports from subordinate battalion UMTs.",
          "Identify shortfalls in religious supplies and equipment across the brigade.",
          "Prioritize resupply based on operational requirements and planned activities.",
        ],
      },
      {
        step_number: 2,
        description: "Coordinate religious supply procurement and distribution.",
        sub_steps: [
          "Submit consolidated resupply requests through the brigade S4 and BSB.",
          "Coordinate procurement of unique denominational supplies through the installation Chaplain or AAFES.",
          "Distribute supplies to subordinate UMTs through the brigade logistics system.",
        ],
      },
      {
        step_number: 3,
        description: "Maintain accountability and readiness of religious support equipment.",
        sub_steps: [
          "Conduct periodic inventories of religious supplies and equipment at brigade and subordinate levels.",
          "Coordinate maintenance of religious support equipment (field organs, PA systems, tentage).",
          "Report religious support logistics status in the brigade logistics status report.",
        ],
      },
    ],
    doctrinal_source: ["AR 165-1", "FM 3-83", "ATP 4-42", "ATP 1-05.04"],
    bft_capability_mapping: ["Provide Religious Support", "Perform/Provide RS"],
    pillar_mapping: ["competence"],
    has_teo: true,
    teo_gap_notes: null,
  },

  // =====================================================================
  // COLLECTIVE TASKS - COMPANY ECHELON
  // =====================================================================
  {
    id: "16-5-2001",
    title: "Establish and Operate a Field Religious Support Site",
    echelon: "company",
    task_type: "collective",
    conditions:
      "Given a company-level unit in a tactical field environment, a UMT with organic equipment, a designated location for religious support, force protection measures, and coordination with the company commander.",
    standards:
      "A field religious support site is established within one hour of occupation. The site provides a designated area for worship, counseling, and pastoral care. Force protection measures are in place. The site is accessible to all company personnel and operational during published hours IAW the company SOP and FM 3-83.",
    performance_steps: [
      {
        step_number: 1,
        description: "Conduct site selection and preparation.",
        sub_steps: [
          "Coordinate with the company commander and first sergeant on site location.",
          "Select a site that provides adequate space, cover, and accessibility for company personnel.",
          "Prepare the site with field altar, seating, lighting, and required religious supplies.",
        ],
      },
      {
        step_number: 2,
        description: "Operate the field religious support site.",
        sub_steps: [
          "Conduct worship services, Bible studies, and religious education at published times.",
          "Provide pastoral counseling and a ministry of presence at the site.",
          "Maintain the site in a clean, orderly, and welcoming condition.",
        ],
      },
      {
        step_number: 3,
        description: "Displace and reconstitute the site as required.",
        sub_steps: [
          "Execute displacement IAW the company movement plan and UMT tactical SOP.",
          "Maintain accountability of all religious supplies and equipment during movement.",
          "Reestablish the site at the new location within one hour of occupation.",
        ],
      },
    ],
    doctrinal_source: ["FM 3-83", "ATP 1-05.04", "ATP 1-05.01"],
    bft_capability_mapping: [
      "Provide Religious Support",
      "Perform/Provide RS",
    ],
    pillar_mapping: ["character", "connection"],
    has_teo: true,
    teo_gap_notes: null,
  },
  {
    id: "16-5-2002",
    title: "Conduct a Memorial Ceremony",
    echelon: "company",
    task_type: "collective",
    conditions:
      "Given a unit that has sustained casualties, a memorial ceremony directive from the commander, a UMT, a ceremony site, battlefield cross or memorial display materials, and coordination with the unit first sergeant, S1, and public affairs.",
    standards:
      "The memorial ceremony is planned and executed within 72 hours of the commander's directive. The ceremony honors the fallen in a dignified and respectful manner. The ceremony includes appropriate religious elements, unit tributes, and military honors. All actions are IAW AR 600-25 and FM 3-83.",
    performance_steps: [
      {
        step_number: 1,
        description: "Plan the memorial ceremony.",
        sub_steps: [
          "Coordinate with the commander on ceremony scope, timing, and location.",
          "Develop the ceremony script including invocation, scripture, eulogy, and benediction elements.",
          "Coordinate with the first sergeant for ceremony details including the battlefield cross, roll call, and firing detail.",
        ],
      },
      {
        step_number: 2,
        description: "Prepare the ceremony site and participants.",
        sub_steps: [
          "Prepare the ceremony site with the battlefield cross or memorial display, seating, and audio equipment.",
          "Rehearse the ceremony sequence with all participants including speakers and honor details.",
          "Coordinate with public affairs on media access and family notification status.",
        ],
      },
      {
        step_number: 3,
        description: "Execute the memorial ceremony.",
        sub_steps: [
          "Conduct the ceremony IAW the approved script and military customs.",
          "Provide pastoral presence and support to Soldiers and family members during and after the ceremony.",
          "Facilitate grief counseling and referrals as needed following the ceremony.",
        ],
      },
    ],
    doctrinal_source: ["FM 3-83", "AR 600-25", "AR 165-1", "ATP 1-05.02"],
    bft_capability_mapping: [
      "Care for the Living and Wounded",
      "Provide Religious Support",
    ],
    pillar_mapping: ["character", "connection"],
    has_teo: true,
    teo_gap_notes: null,
  },

  // =====================================================================
  // COLLECTIVE TASKS - DIVISION, CORPS, THEATER ECHELONS
  // =====================================================================
  {
    id: "71-DIV-4240",
    title: "Coordinate Division-Level Religious Support",
    echelon: "division",
    task_type: "collective",
    conditions:
      "Given a division headquarters with an assigned division Chaplain section, subordinate brigade UMTs, the division operations order, access to the division commander and staff, and coordination with supporting installation Chaplain resources.",
    standards:
      "The division Chaplain section provides technical supervision, coordination, and oversight of religious support operations across all subordinate brigades. The division Chaplain participates in division-level MDMP and provides religious advisement to the commanding general. Religious support is synchronized across the division area of operations IAW FM 3-83 and AR 165-1.",
    performance_steps: [
      {
        step_number: 1,
        description: "Establish division-level religious support oversight.",
        sub_steps: [
          "Organize the division Chaplain section to provide staff oversight and coordination.",
          "Establish reporting procedures and communication channels with subordinate brigade UMTs.",
          "Integrate into the division staff and participate in battle rhythm events.",
        ],
      },
      {
        step_number: 2,
        description: "Coordinate religious support across the division.",
        sub_steps: [
          "Synchronize religious support operations across subordinate brigades and supporting units.",
          "Cross-level UMT assets to address denominational shortfalls and operational requirements.",
          "Coordinate with installation Chaplain resources for rear detachment and family support.",
        ],
      },
      {
        step_number: 3,
        description: "Provide religious advisement to the division commander.",
        sub_steps: [
          "Brief the commanding general on the religious dynamics of the operational environment.",
          "Advise on moral and ethical issues affecting the command.",
          "Provide input on religious factors during division-level planning and decision-making.",
        ],
      },
      {
        step_number: 4,
        description: "Assess and report division religious support readiness.",
        sub_steps: [
          "Collect and analyze religious support metrics from subordinate brigades.",
          "Report division religious support status to the corps Chaplain.",
        ],
      },
    ],
    doctrinal_source: ["FM 3-83", "AR 165-1", "ADP 3-0", "FM 6-0"],
    bft_capability_mapping: [
      "Advise the Commander",
      "Provide Religious Support",
      "Perform/Provide RS",
    ],
    pillar_mapping: ["competence", "connection", "constitutional"],
    has_teo: true,
    teo_gap_notes: null,
  },
  {
    id: "71-CORPS-4240",
    title: "Synchronize Corps Religious Support Operations",
    echelon: "corps",
    task_type: "collective",
    conditions:
      "Given a corps headquarters with an assigned corps Chaplain section, subordinate division Chaplain sections, the corps operations order, access to the corps commander and staff, and coordination with theater religious support assets.",
    standards:
      "The corps Chaplain section synchronizes religious support operations across all subordinate divisions and corps troops. The corps Chaplain provides religious advisement to the commanding general and coordinates with joint and multinational religious support counterparts. Religious support is resourced and synchronized across the corps area of operations IAW FM 3-83 and AR 165-1.",
    performance_steps: [
      {
        step_number: 1,
        description: "Establish corps-level religious support synchronization.",
        sub_steps: [
          "Organize the corps Chaplain section to provide oversight of division and corps troop religious support.",
          "Establish reporting and coordination procedures with subordinate division Chaplain sections.",
          "Integrate into the corps staff and participate in corps-level battle rhythm events.",
        ],
      },
      {
        step_number: 2,
        description: "Synchronize religious support across the corps area of operations.",
        sub_steps: [
          "Coordinate religious support resourcing and cross-leveling across divisions.",
          "Synchronize religious support with corps-level operations including deep and shaping operations.",
          "Coordinate with joint force and multinational religious support counterparts.",
        ],
      },
      {
        step_number: 3,
        description: "Advise the corps commander on religious affairs.",
        sub_steps: [
          "Provide strategic religious advisement to the commanding general on operational environment dynamics.",
          "Advise on policy matters related to religious support, free exercise of religion, and accommodation.",
          "Brief the corps staff on religious and cultural factors affecting corps operations.",
        ],
      },
      {
        step_number: 4,
        description: "Manage corps religious support resources and personnel.",
        sub_steps: [
          "Monitor Chaplain and Religious Affairs Specialist manning across the corps.",
          "Coordinate augmentation and replacement of UMT personnel as required.",
          "Report corps religious support status to the theater Chaplain.",
        ],
      },
    ],
    doctrinal_source: ["FM 3-83", "AR 165-1", "ADP 3-0", "JP 1-05"],
    bft_capability_mapping: [
      "Advise the Commander",
      "Provide Religious Support",
      "Perform/Provide RS",
    ],
    pillar_mapping: ["competence", "constitutional", "connection"],
    has_teo: false,
    teo_gap_notes:
      "No formal T&EO exists at Corps level. Current operations based on division-level T&EO adaptation. Standardization needed.",
  },
  {
    id: "71-CMD-4240",
    title: "Direct Theater Religious Support Operations",
    echelon: "theater",
    task_type: "collective",
    conditions:
      "Given a theater army or combatant command headquarters with an assigned command Chaplain section, subordinate corps and division Chaplain sections, the theater campaign plan, access to the commanding general and theater staff, and coordination with joint, interagency, and multinational partners.",
    standards:
      "The command Chaplain directs and synchronizes religious support operations across the theater of operations. Religious support policy is established and disseminated. The command Chaplain advises the combatant commander on religious affairs and ensures free exercise of religion for all service members in the theater IAW FM 3-83, AR 165-1, and JP 1-05.",
    performance_steps: [
      {
        step_number: 1,
        description: "Establish theater religious support policy and oversight.",
        sub_steps: [
          "Develop and publish theater religious support policy and guidance.",
          "Establish reporting and oversight procedures for subordinate Chaplain sections.",
          "Coordinate with joint, interagency, and multinational religious support counterparts.",
        ],
      },
      {
        step_number: 2,
        description: "Direct religious support resourcing across the theater.",
        sub_steps: [
          "Manage the allocation of Chaplain and Religious Affairs Specialist personnel across the theater.",
          "Coordinate procurement and distribution of religious supplies across the theater logistics system.",
          "Identify and address denominational coverage gaps across theater formations.",
        ],
      },
      {
        step_number: 3,
        description: "Advise the combatant commander on theater-level religious affairs.",
        sub_steps: [
          "Provide strategic-level religious advisement on the theater operational environment.",
          "Advise on the religious dimensions of engagement with host nation populations and leaders.",
          "Contribute to theater assessment frameworks with religious environment analysis.",
        ],
      },
      {
        step_number: 4,
        description: "Assess and report theater religious support effectiveness.",
        sub_steps: [
          "Collect and analyze religious support metrics from across the theater.",
          "Report theater religious support status to the Chief of Chaplains.",
          "Develop recommendations for improving theater religious support operations.",
        ],
      },
    ],
    doctrinal_source: ["FM 3-83", "AR 165-1", "JP 1-05", "ADP 3-0"],
    bft_capability_mapping: [
      "Advise the Commander",
      "Provide Religious Support",
      "Perform/Provide RS",
    ],
    pillar_mapping: ["competence", "constitutional", "connection"],
    has_teo: true,
    teo_gap_notes: null,
  },

  // =====================================================================
  // INDIVIDUAL TASKS - 56A CHAPLAIN
  // =====================================================================
  {
    id: "805D-56A-6000",
    title: "Advise the Commander on Religious Affairs",
    echelon: "battalion",
    task_type: "individual_56a",
    conditions:
      "Given assignment as a battalion Chaplain, access to the battalion commander and staff, intelligence products, religious demographics data, and knowledge of the operational environment and applicable regulations.",
    standards:
      "The Chaplain provides timely, accurate, and relevant advisement to the commander on the religious dimensions of the operational environment, the free exercise of religion, moral and ethical leadership, and the impact of command decisions on Soldier morale and welfare. Advisement is IAW FM 3-83, AR 165-1, and ADP 6-22.",
    performance_steps: [
      {
        step_number: 1,
        description: "Assess the command environment and identify advisement requirements.",
        sub_steps: [
          "Monitor unit climate indicators including morale, discipline, and spiritual fitness.",
          "Analyze the religious and cultural dynamics of the operational environment.",
          "Identify ethical, moral, and religious issues requiring commander awareness.",
        ],
      },
      {
        step_number: 2,
        description: "Prepare and deliver advisement to the commander.",
        sub_steps: [
          "Develop clear, concise advisement products tailored to the commander's decision requirements.",
          "Brief the commander on religious affairs during staff meetings, counseling sessions, or as the situation requires.",
          "Provide recommendations for command action on religious support and accommodation matters.",
        ],
      },
      {
        step_number: 3,
        description: "Follow up on advisement and assess outcomes.",
        sub_steps: [
          "Track the implementation and impact of advisement provided.",
          "Update advisement based on changes in the operational environment or command climate.",
          "Maintain a record of advisement provided for continuity and professional development.",
        ],
      },
    ],
    doctrinal_source: ["FM 3-83", "AR 165-1", "ADP 6-22", "ADRP 6-22"],
    bft_capability_mapping: ["Advise the Commander"],
    pillar_mapping: ["competence", "constitutional", "character"],
    has_teo: false,
    teo_gap_notes:
      "No formal T&EO exists. Advisement competency assessed through observation and evaluation only. Critical gap in standardized assessment.",
  },
  {
    id: "805D-56A-6001",
    title: "Conduct Pastoral Counseling",
    echelon: "battalion",
    task_type: "individual_56a",
    conditions:
      "Given assignment as a battalion Chaplain, a private and secure counseling location, knowledge of military and community referral resources, and applicable regulations governing privileged communication and confidentiality.",
    standards:
      "The Chaplain provides pastoral counseling to all service members, family members, and authorized personnel who request it. Counseling sessions maintain absolute confidentiality IAW 10 USC 1044 and AR 165-1. The Chaplain makes appropriate referrals to behavioral health, family advocacy, or other support agencies when the presenting issue exceeds pastoral counseling scope.",
    performance_steps: [
      {
        step_number: 1,
        description: "Establish and maintain a pastoral counseling capability.",
        sub_steps: [
          "Identify and prepare a private, secure counseling space in garrison and field environments.",
          "Publicize counseling availability to unit personnel through chain of command and published schedules.",
          "Maintain current knowledge of military and community referral resources.",
        ],
      },
      {
        step_number: 2,
        description: "Conduct pastoral counseling sessions.",
        sub_steps: [
          "Receive and screen counseling requests, prioritizing based on urgency and need.",
          "Conduct counseling sessions using appropriate pastoral counseling techniques.",
          "Maintain confidentiality IAW privileged communication statutes and AR 165-1.",
        ],
      },
      {
        step_number: 3,
        description: "Make referrals and provide follow-up care.",
        sub_steps: [
          "Identify situations requiring referral to behavioral health, Military OneSource, or other agencies.",
          "Facilitate warm handoffs to referral agencies while maintaining pastoral relationship.",
          "Conduct follow-up counseling as needed and appropriate.",
        ],
      },
    ],
    doctrinal_source: ["AR 165-1", "FM 3-83", "10 USC 1044", "ATP 1-05.02"],
    bft_capability_mapping: [
      "Provide Religious Support",
      "Care for the Living and Wounded",
    ],
    pillar_mapping: ["character", "connection"],
    has_teo: true,
    teo_gap_notes: null,
  },
  {
    id: "805D-56A-6002",
    title: "Provide Crisis Intervention",
    echelon: "battalion",
    task_type: "individual_56a",
    conditions:
      "Given a crisis situation (suicidal ideation, sexual assault, traumatic event, death notification, or similar critical incident), a Chaplain, access to emergency referral resources, and coordination with the chain of command, behavioral health, and law enforcement as applicable.",
    standards:
      "The Chaplain provides immediate pastoral intervention to individuals in crisis. The Chaplain assesses risk, provides stabilization, ensures safety, and facilitates appropriate referrals within 30 minutes of notification. All actions comply with mandatory reporting requirements, privileged communication protections, and AR 165-1.",
    performance_steps: [
      {
        step_number: 1,
        description: "Respond to the crisis and conduct an initial assessment.",
        sub_steps: [
          "Respond to the crisis location or contact the individual in crisis as rapidly as possible.",
          "Conduct an initial risk assessment to determine the severity and nature of the crisis.",
          "Ensure the immediate physical safety of the individual and others.",
        ],
      },
      {
        step_number: 2,
        description: "Provide crisis stabilization and pastoral care.",
        sub_steps: [
          "Employ active listening, pastoral presence, and de-escalation techniques.",
          "Provide spiritual and emotional support tailored to the individual's needs and faith tradition.",
          "Assess for mandatory reporting requirements while maintaining privileged communication protections.",
        ],
      },
      {
        step_number: 3,
        description: "Facilitate referrals and coordinate follow-up.",
        sub_steps: [
          "Coordinate with behavioral health, the chain of command, and other support agencies as appropriate.",
          "Facilitate the individual's connection with appropriate crisis intervention resources.",
          "Conduct follow-up pastoral care and monitor the individual's recovery.",
        ],
      },
      {
        step_number: 4,
        description: "Document actions and conduct self-care.",
        sub_steps: [
          "Document crisis intervention actions as required while protecting privileged information.",
          "Engage in self-care and peer support to mitigate compassion fatigue and secondary trauma.",
        ],
      },
    ],
    doctrinal_source: [
      "AR 165-1",
      "FM 3-83",
      "ATP 1-05.02",
      "AR 600-63",
      "DoDI 6490.16",
    ],
    bft_capability_mapping: [
      "Care for the Living and Wounded",
      "Provide Religious Support",
    ],
    pillar_mapping: ["character", "competence", "connection"],
    has_teo: true,
    teo_gap_notes: null,
  },
  {
    id: "805D-56A-6003",
    title: "Conduct Worship Services in a Field Environment",
    echelon: "battalion",
    task_type: "individual_56a",
    conditions:
      "Given a battalion in a tactical field environment, a Chaplain with field worship supplies (chaplain kit, communion elements, religious literature), a designated worship location, security provisions, and a published worship schedule.",
    standards:
      "The Chaplain conducts worship services that meet the religious needs of the unit in a field environment. Services are conducted at published times and accessible locations. The Chaplain provides worship opportunities for as many faith groups as possible, coordinating with area Chaplains for denominational coverage. Services comply with the tactical situation and force protection requirements IAW FM 3-83 and AR 165-1.",
    performance_steps: [
      {
        step_number: 1,
        description: "Plan and prepare for field worship services.",
        sub_steps: [
          "Assess unit religious demographics and determine worship service requirements.",
          "Coordinate worship times and locations with the company commanders and operations section.",
          "Prepare worship materials including liturgy, music, communion elements, and religious literature.",
        ],
      },
      {
        step_number: 2,
        description: "Conduct worship services.",
        sub_steps: [
          "Set up the worship area with field altar, seating, and required religious items.",
          "Conduct the worship service IAW the faith tradition and liturgical requirements.",
          "Provide opportunity for individual prayer, communion, and confession as appropriate.",
        ],
      },
      {
        step_number: 3,
        description: "Coordinate additional denominational coverage.",
        sub_steps: [
          "Identify faith groups requiring worship support not available from the unit Chaplain.",
          "Coordinate with area Chaplains or the brigade UMT for denominational support visits.",
          "Facilitate lay-led worship for faith groups when a Chaplain of that tradition is unavailable.",
        ],
      },
    ],
    doctrinal_source: ["FM 3-83", "AR 165-1", "ATP 1-05.01", "ATP 1-05.04"],
    bft_capability_mapping: [
      "Provide Religious Support",
      "Perform/Provide RS",
    ],
    pillar_mapping: ["character", "connection"],
    has_teo: true,
    teo_gap_notes: null,
  },
  {
    id: "805D-56A-6203",
    title: "Conduct a Religious Area Analysis",
    echelon: "brigade",
    task_type: "individual_56a",
    conditions:
      "Given an assigned area of operations, access to intelligence products, civil information management data, open-source religious and cultural data, coordination with civil affairs and information operations staff, and applicable doctrinal references.",
    standards:
      "The Chaplain conducts a comprehensive religious area analysis (RAA) of the assigned area of operations. The RAA identifies religious groups, leaders, institutions, holy sites, religious dynamics, and potential sources of conflict or cooperation. The RAA product is delivered to the commander and staff in a format that supports operational planning and decision-making IAW FM 3-83 and ATP 1-05.03.",
    performance_steps: [
      {
        step_number: 1,
        description: "Collect information for the religious area analysis.",
        sub_steps: [
          "Review intelligence products, civil information databases, and open-source materials for religious data.",
          "Coordinate with the S2, civil affairs, and information operations for relevant information.",
          "Identify data gaps and develop collection requirements for religious and cultural information.",
        ],
      },
      {
        step_number: 2,
        description: "Analyze religious dynamics in the area of operations.",
        sub_steps: [
          "Map religious groups, leaders, institutions, and holy sites in the area of operations.",
          "Analyze relationships among religious groups and between religious groups and the population.",
          "Identify religious dynamics that may present threats, opportunities, or operational considerations.",
        ],
      },
      {
        step_number: 3,
        description: "Produce and present the religious area analysis.",
        sub_steps: [
          "Prepare the RAA product in a format suitable for staff integration and operational planning.",
          "Brief the commander and staff on key findings and recommendations.",
          "Update the RAA as new information becomes available or the situation changes.",
        ],
      },
    ],
    doctrinal_source: ["FM 3-83", "ATP 1-05.03", "ATP 3-57.60", "AR 165-1"],
    bft_capability_mapping: ["Advise the Commander"],
    pillar_mapping: ["competence", "constitutional"],
    has_teo: false,
    teo_gap_notes:
      "No formal T&EO exists for RAA. Current training relies on BOLC instruction with no standardized field assessment criteria.",
  },

  // =====================================================================
  // INDIVIDUAL TASKS - 56M RELIGIOUS AFFAIRS SPECIALIST
  // =====================================================================
  {
    id: "805D-56M-5000",
    title: "Establish and Maintain the UMT Tactical Workspace",
    echelon: "battalion",
    task_type: "individual_56m",
    conditions:
      "Given a tactical field environment, UMT organic equipment (communications, automation, supplies), a designated workspace location in the command post or field site, and coordination with the Chaplain and unit operations section.",
    standards:
      "The Religious Affairs Specialist establishes the UMT tactical workspace within 30 minutes of occupation. Communications are established with the battalion TOC and subordinate elements. UMT automation equipment is operational. The workspace supports the Chaplain's participation in staff operations and provides a secure area for sensitive pastoral communications IAW FM 3-83 and the unit tactical SOP.",
    performance_steps: [
      {
        step_number: 1,
        description: "Set up the UMT tactical workspace.",
        sub_steps: [
          "Identify and prepare the designated workspace location in the command post or field site.",
          "Set up UMT automation equipment including computers, printers, and communication devices.",
          "Establish communications connectivity with the battalion net and higher headquarters.",
        ],
      },
      {
        step_number: 2,
        description: "Maintain workspace operations and equipment readiness.",
        sub_steps: [
          "Conduct preventive maintenance on UMT equipment IAW applicable technical manuals.",
          "Maintain backup communications capability and alternate workspace procedures.",
          "Ensure the workspace is organized and supports the Chaplain's staff and pastoral functions.",
        ],
      },
      {
        step_number: 3,
        description: "Displace and reestablish the workspace as required.",
        sub_steps: [
          "Execute displacement procedures IAW the unit tactical SOP and movement plan.",
          "Maintain accountability and security of UMT equipment during movement.",
          "Reestablish the workspace at the new location within 30 minutes of occupation.",
        ],
      },
    ],
    doctrinal_source: ["FM 3-83", "ATP 1-05.04", "STP 1-56M14-SM-TG"],
    bft_capability_mapping: ["Perform/Provide RS"],
    pillar_mapping: ["competence"],
    has_teo: true,
    teo_gap_notes: null,
  },
  {
    id: "805D-56M-5001",
    title: "Prepare Religious Support Operations Products",
    echelon: "battalion",
    task_type: "individual_56m",
    conditions:
      "Given a UMT assigned to a battalion, access to UMT automation equipment, unit operations orders and overlays, religious support data, and coordination with the Chaplain and battalion staff.",
    standards:
      "The Religious Affairs Specialist prepares accurate, timely religious support products including the religious support overlay, running estimates, annexes, and reports. Products conform to military staff writing standards and doctrinal formats. Products are delivered to the Chaplain and staff in time to support the planning and decision-making timeline IAW FM 3-83 and FM 6-0.",
    performance_steps: [
      {
        step_number: 1,
        description: "Gather information for religious support products.",
        sub_steps: [
          "Collect religious support data from unit records, personnel systems, and subordinate UMTs.",
          "Review current operations orders, overlays, and intelligence products for relevant information.",
          "Coordinate with the S1, S2, and S3 for data required to complete religious support products.",
        ],
      },
      {
        step_number: 2,
        description: "Prepare religious support staff products.",
        sub_steps: [
          "Prepare the religious support overlay depicting UMT locations, RSA sites, and movement routes.",
          "Draft the religious support running estimate, annex, and reports IAW doctrinal formats.",
          "Prepare briefing slides and visual products as directed by the Chaplain.",
        ],
      },
      {
        step_number: 3,
        description: "Quality check and submit products.",
        sub_steps: [
          "Review products for accuracy, completeness, and adherence to staff writing standards.",
          "Present products to the Chaplain for review and approval.",
          "Submit approved products to the appropriate staff section within established timelines.",
        ],
      },
    ],
    doctrinal_source: [
      "FM 3-83",
      "FM 6-0",
      "STP 1-56M14-SM-TG",
      "ATP 1-05.01",
    ],
    bft_capability_mapping: ["Perform/Provide RS"],
    pillar_mapping: ["competence"],
    has_teo: true,
    teo_gap_notes: null,
  },
  {
    id: "805D-56M-5002",
    title: "Provide Force Protection for the UMT",
    echelon: "battalion",
    task_type: "individual_56m",
    conditions:
      "Given a UMT operating in a tactical environment, the Religious Affairs Specialist's assigned weapon and equipment, the unit tactical SOP, threat assessment from the S2, and coordination with the unit security plan.",
    standards:
      "The Religious Affairs Specialist provides continuous force protection for the UMT. The Specialist maintains weapons qualification, executes individual and crew-served weapons tasks, plans and executes UMT movement security, and integrates UMT security into the unit force protection plan. The Chaplain is protected as a noncombatant IAW the Geneva Conventions. All actions comply with the unit tactical SOP and applicable rules of engagement.",
    performance_steps: [
      {
        step_number: 1,
        description: "Plan UMT force protection measures.",
        sub_steps: [
          "Assess the threat to the UMT based on the S2 threat assessment and tactical situation.",
          "Develop UMT movement routes, alternate routes, and rally points.",
          "Coordinate UMT security integration into the unit force protection plan.",
        ],
      },
      {
        step_number: 2,
        description: "Execute UMT force protection during operations.",
        sub_steps: [
          "Maintain situational awareness and communicate threat information to the Chaplain.",
          "Execute convoy and mounted/dismounted security procedures during UMT movement.",
          "React to enemy contact IAW battle drills and the unit tactical SOP while protecting the Chaplain.",
        ],
      },
      {
        step_number: 3,
        description: "Maintain weapons proficiency and tactical skills.",
        sub_steps: [
          "Maintain weapons qualification with assigned individual and crew-served weapons.",
          "Conduct periodic tactical skills training including land navigation, communications, and first aid.",
          "Rehearse UMT battle drills including react to contact, react to IED, and MASCAL response.",
        ],
      },
    ],
    doctrinal_source: [
      "FM 3-83",
      "STP 1-56M14-SM-TG",
      "ATP 1-05.04",
      "STP 21-1-SMCT",
    ],
    bft_capability_mapping: ["Perform/Provide RS"],
    pillar_mapping: ["competence", "character"],
    has_teo: true,
    teo_gap_notes: null,
  },
  {
    id: "805D-56M-5003",
    title: "Process Religious Accommodation Requests",
    echelon: "battalion",
    task_type: "individual_56m",
    conditions:
      "Given a religious accommodation request from a service member, access to AR 600-20 and DoDI 1300.17, the unit personnel section, and coordination with the Chaplain and the battalion commander's approval authority.",
    standards:
      "The Religious Affairs Specialist processes religious accommodation requests accurately and within the established timeline. The Specialist prepares the request packet IAW AR 600-20 and DoDI 1300.17, coordinates with the Chaplain for the religious interview and endorsement, routes the packet through the chain of command, and tracks the request through final disposition. All actions protect the service member's religious liberty rights.",
    performance_steps: [
      {
        step_number: 1,
        description: "Receive and prepare the religious accommodation request.",
        sub_steps: [
          "Receive the accommodation request from the service member and explain the process and timeline.",
          "Gather required documentation including the service member's written request and supporting materials.",
          "Prepare the request packet IAW the format prescribed in AR 600-20 and DoDI 1300.17.",
        ],
      },
      {
        step_number: 2,
        description: "Coordinate the Chaplain interview and endorsement.",
        sub_steps: [
          "Schedule the service member for a religious interview with the Chaplain.",
          "Assist the Chaplain in preparing the interview memorandum and endorsement.",
          "Incorporate the Chaplain's interview results and endorsement into the request packet.",
        ],
      },
      {
        step_number: 3,
        description: "Route and track the accommodation request.",
        sub_steps: [
          "Route the completed packet through the chain of command to the approval authority.",
          "Track the request status and provide updates to the service member and chain of command.",
          "Process the approved or disapproved request and ensure the service member is notified of the decision and appeal rights.",
        ],
      },
    ],
    doctrinal_source: [
      "AR 600-20",
      "DoDI 1300.17",
      "AR 165-1",
      "FM 3-83",
    ],
    bft_capability_mapping: [
      "Provide Religious Support",
      "Perform/Provide RS",
    ],
    pillar_mapping: ["constitutional", "competence"],
    has_teo: false,
    teo_gap_notes:
      "No formal T&EO exists. Training conducted ad hoc during AIT. Religious accommodation processing is a critical skill gap.",
  },
  {
    id: "805D-56M-5004",
    title: "Coordinate Logistics for Religious Support",
    echelon: "battalion",
    task_type: "individual_56m",
    conditions:
      "Given a UMT assigned to a battalion, access to the unit supply system and the S4, a religious supplies inventory, expendable and non-expendable religious support equipment, and coordination with the Chaplain and higher headquarters UMT.",
    standards:
      "The Religious Affairs Specialist maintains religious support supplies and equipment at or above 90% of authorized levels. Supply requests are submitted within the unit supply timeline. Property accountability is maintained IAW AR 710-2 and AR 165-1. Expendable supplies (communion elements, candles, religious literature) are on hand to support planned religious activities.",
    performance_steps: [
      {
        step_number: 1,
        description: "Conduct inventory and assess supply requirements.",
        sub_steps: [
          "Conduct a complete inventory of religious support supplies and equipment.",
          "Assess supply requirements based on the religious support schedule and planned operations.",
          "Identify shortfalls and prepare a prioritized resupply list.",
        ],
      },
      {
        step_number: 2,
        description: "Procure and manage religious support supplies.",
        sub_steps: [
          "Submit supply requests through the unit supply channel and the S4.",
          "Coordinate procurement of unique denominational supplies through the brigade UMT or installation Chaplain.",
          "Receive, inspect, and store religious supplies IAW applicable storage and handling requirements.",
        ],
      },
      {
        step_number: 3,
        description: "Maintain property accountability and equipment readiness.",
        sub_steps: [
          "Maintain hand receipts and property records for all non-expendable religious support equipment.",
          "Conduct periodic inventories and reconcile property records with on-hand quantities.",
          "Coordinate maintenance and repair of religious support equipment (PA systems, field organs, tentage).",
        ],
      },
    ],
    doctrinal_source: [
      "AR 165-1",
      "AR 710-2",
      "FM 3-83",
      "STP 1-56M14-SM-TG",
    ],
    bft_capability_mapping: ["Perform/Provide RS"],
    pillar_mapping: ["competence"],
    has_teo: true,
    teo_gap_notes: null,
  },
] as const;

export type TaskSeed = (typeof TASKS_SEED)[number];
