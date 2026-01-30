const COMMON_TERMS = `
GENERAL TERMS & CONDITIONS (ALL TIERS)

1.     INFRASTRUCTURE & SOFTWARE:
        Includes access to proprietary Sending Software, Private IP Server, and Warm-up Network.
        Includes maintenance of the contracted domains and inbox fleet.

2.     COMPLIANCE & ACCEPTABLE USE:
        Client agrees to strict adherence to CAN-SPAM, GDPR, and CASL.
        Zero Tolerance Policy: Phishing, scams, or adult content result in immediate termination without refund.

3.     PAYMENT TERMS:
        Setup fees are non-refundable. Monthly fees are paid in advance.
        By signing, Client authorizes EZOS Tech to charge the payment method on file for the monthly
        subscription fee on the service start date and on the same day each month thereafter until
        cancellation in accordance with the Term & Fit section.
        Late payments > 7 days may result in a temporary pause of sending infrastructure.

4.     EXIT PROTOCOL:
        Domains are transferred to Client upon termination.
        Inbox Workspaces and Software Access are leased assets and will be revoked.

5.     NO GUARANTEES:
        EZOS Tech does not guarantee specific deliverability rates, reply rates, meetings, or revenue.
        Third-party providers (e.g., Google, Microsoft) control inbox placement and sender reputation.

6.     CLIENT CONTENT RESPONSIBILITY:
        Client is solely responsible for email copy, targeting criteria, list sourcing, and compliance.
        Client warrants that all outreach content and data usage is lawful and permitted.

7.     INDEMNIFICATION:
        Client agrees to indemnify and hold harmless EZOS Tech from claims, damages, or liabilities
        arising from Client's content, data sources, or sending practices.

8.     CONFIDENTIALITY & DATA HANDLING:
        Each party agrees to keep the other's confidential information private and secure.
        EZOS Tech will use Client data only for service delivery and will not sell Client data.

9.     SUSPENSION & TERMINATION:
        EZOS Tech may suspend or terminate service for abuse, compliance risk, or non-payment.
        Termination does not waive payment obligations incurred prior to termination.
`;

const ADDONS = `
13.    ADD-ONS (OPTIONAL)
        Additional inboxes: $6 each/month
        Additional domains: $15 each/year
        LinkedIn outreach sync: $750/mo
        Extra sequence/angle: $600 each
        Deliverability deep-dive audit: $500 one-off
        Team training and SOPs (2 hrs): $450
        Prep sprint (ICP/offer/copy, 2 weeks): $1,900
`;

const TERMS_FIT = `
14.    TERMS & FIT
        Infra (mailboxes + domains) included up to plan size.
        We only work with B2B offers $5,000+.
        Clear ICP and a closer available are required.
        Monthly retainer; 30-day notice to cancel unless otherwise agreed in SOW.
`;

const TIERS = {
  'diy-70': {
    label: 'DIY-70',
    tier: 'DIY',
    setupFee: 2000,
    monthly: 1500,
    capacity: '70 active + 70 redundancy (140 total)',
    domains: 'Up to 47 domains included',
    commitment: '3-Month Minimum',
    deliverables: ['Weekly deliverability snapshot', 'Ticketed support (24-48h)'],
    responsibility: `
11.    LIMITATION OF LIABILITY (THE "DRIVER" CLAUSE):
        EZOS Tech is responsible for Technical Health (DNS records, server uptime, warm-up scripts).
        Client is responsible for Behavioral Health (copywriting, lead targeting, sending volume).
        DISCLAIMER: EZOS Tech is NOT liable for domain blacklisting ("Burn") caused by Client sending activity.
        REPLACEMENT POLICY: Domains burned due to user error/aggression are NOT replaced for free.
        Replacements are charged at $15.00 per domain + labor.
`
  },
  'diy-100': {
    label: 'DIY-100',
    tier: 'DIY',
    setupFee: 2500,
    monthly: 1900,
    capacity: '100 active + 100 redundancy (200 total)',
    domains: 'Up to 67 domains included',
    commitment: '3-Month Minimum',
    deliverables: ['Weekly deliverability snapshot', 'Ticketed support (24-48h)'],
    responsibility: `
11.    LIMITATION OF LIABILITY (THE "DRIVER" CLAUSE):
        EZOS Tech is responsible for Technical Health (DNS records, server uptime, warm-up scripts).
        Client is responsible for Behavioral Health (copywriting, lead targeting, sending volume).
        DISCLAIMER: EZOS Tech is NOT liable for domain blacklisting ("Burn") caused by Client sending activity.
        REPLACEMENT POLICY: Domains burned due to user error/aggression are NOT replaced for free.
        Replacements are charged at $15.00 per domain + labor.
`
  },
  'diy-150': {
    label: 'DIY-150',
    tier: 'DIY',
    setupFee: 3000,
    monthly: 2200,
    capacity: '150 active + 150 redundancy (300 total)',
    domains: 'Up to 100 domains included',
    commitment: '3-Month Minimum',
    deliverables: ['Weekly deliverability snapshot', 'Ticketed support (24-48h)'],
    responsibility: `
11.    LIMITATION OF LIABILITY (THE "DRIVER" CLAUSE):
        EZOS Tech is responsible for Technical Health (DNS records, server uptime, warm-up scripts).
        Client is responsible for Behavioral Health (copywriting, lead targeting, sending volume).
        DISCLAIMER: EZOS Tech is NOT liable for domain blacklisting ("Burn") caused by Client sending activity.
        REPLACEMENT POLICY: Domains burned due to user error/aggression are NOT replaced for free.
        Replacements are charged at $15.00 per domain + labor.
`
  },
  'engine-70': {
    label: 'ENGINE-70',
    tier: 'ENGINE',
    setupFee: 2000,
    monthly: 5000,
    capacity: '70 active + 70 redundancy',
    domains: 'Domains included up to plan size',
    deliverables: [
      'Verified data: 3k - 5k contacts/month aligned to ICP',
      'Live sequences (2) + 1 experimental angle; you approve',
      'Daily health checks, inbox swaps, bounce guardrails',
      'Weekly A/Bs; monthly angle review',
      'Reporting: weekly snapshot + fortnightly optimization call'
    ],
    responsibility: `
11.    SHARED RESPONSIBILITY:
        EZOS Tech manages the sending engine, bounce guardrails, and technical rotation.
        Client approves all copy angles prior to launch.
        REPLACEMENT POLICY: EZOS Tech covers standard wear-and-tear domain replacements
        (up to 10% of fleet/month). Excessive burn caused by Client rejecting advice is billable.

12.    CRM HANDOFF:
        EZOS Tech pushes "Interested" leads to Client CRM/Calendar. Client is responsible for booking
        and closing.
`
  },
  'engine-100': {
    label: 'ENGINE-100',
    tier: 'ENGINE',
    setupFee: 2500,
    monthly: 6250,
    capacity: '100 active + 100 redundancy',
    domains: 'Domains included up to plan size',
    deliverables: [
      'Verified data: 5k - 7.5k contacts/month aligned to ICP',
      'Live sequences (2) + 1 experimental angle; you approve',
      'Daily health checks, inbox swaps, bounce guardrails',
      'Weekly A/Bs; monthly angle review',
      'Reporting: weekly snapshot + fortnightly optimization call'
    ],
    responsibility: `
11.    SHARED RESPONSIBILITY:
        EZOS Tech manages the sending engine, bounce guardrails, and technical rotation.
        Client approves all copy angles prior to launch.
        REPLACEMENT POLICY: EZOS Tech covers standard wear-and-tear domain replacements
        (up to 10% of fleet/month). Excessive burn caused by Client rejecting advice is billable.

12.    CRM HANDOFF:
        EZOS Tech pushes "Interested" leads to Client CRM/Calendar. Client is responsible for booking
        and closing.
`
  },
  'engine-150': {
    label: 'ENGINE-150',
    tier: 'ENGINE',
    setupFee: 3000,
    monthly: 8250,
    capacity: '150 active + 150 redundancy',
    domains: 'Domains included up to plan size',
    deliverables: [
      'Verified data: 7.5k - 10k contacts/month aligned to ICP',
      'Live sequences (2) + 1 experimental angle; you approve',
      'Daily health checks, inbox swaps, bounce guardrails',
      'Weekly A/Bs; monthly angle review',
      'Reporting: weekly snapshot + fortnightly optimization call'
    ],
    responsibility: `
11.    SHARED RESPONSIBILITY:
        EZOS Tech manages the sending engine, bounce guardrails, and technical rotation.
        Client approves all copy angles prior to launch.
        REPLACEMENT POLICY: EZOS Tech covers standard wear-and-tear domain replacements
        (up to 10% of fleet/month). Excessive burn caused by Client rejecting advice is billable.

12.    CRM HANDOFF:
        EZOS Tech pushes "Interested" leads to Client CRM/Calendar. Client is responsible for booking
        and closing.
`
  },
  'scale-70': {
    label: 'SCALE-70',
    tier: 'SCALE',
    setupFee: 5000,
    monthly: 9500,
    capacity: '70 active + 70 redundancy',
    domains: 'Domains included up to plan size',
    deliverables: [
      'Reply handling with SLA (<=4 hrs UK time)',
      'Qualification against your must-haves',
      'Booking, routing, reschedules, show-rate workflows',
      'Light nurture for "not now" + transcripts/QA',
      'Weekly ops call; shared Slack/Teams channel'
    ],
    responsibility: `
11.    FULL MANAGEMENT:
        EZOS Tech handles qualification, booking, routing, and rescheduling.
        EZOS Tech manages "Nurture" flows for "Not Now" leads.

12.    PERFORMANCE GUARANTEE & LIABILITY:
        EZOS Tech assumes full responsibility for infrastructure health and domain rotation.
        EZOS Tech will proactively replace degrading domains at no extra cost to maintain volume.
`
  },
  'scale-100': {
    label: 'SCALE-100',
    tier: 'SCALE',
    setupFee: 6000,
    monthly: 11500,
    capacity: '100 active + 100 redundancy',
    domains: 'Domains included up to plan size',
    deliverables: [
      'Reply handling with SLA (<=4 hrs UK time)',
      'Qualification against your must-haves',
      'Booking, routing, reschedules, show-rate workflows',
      'Light nurture for "not now" + transcripts/QA',
      'Weekly ops call; shared Slack/Teams channel'
    ],
    responsibility: `
11.    FULL MANAGEMENT:
        EZOS Tech handles qualification, booking, routing, and rescheduling.
        EZOS Tech manages "Nurture" flows for "Not Now" leads.

12.    PERFORMANCE GUARANTEE & LIABILITY:
        EZOS Tech assumes full responsibility for infrastructure health and domain rotation.
        EZOS Tech will proactively replace degrading domains at no extra cost to maintain volume.
`
  },
  'scale-150': {
    label: 'SCALE-150',
    tier: 'SCALE',
    setupFee: 7000,
    monthly: 14500,
    capacity: '150 active + 150 redundancy',
    domains: 'Domains included up to plan size',
    deliverables: [
      'Reply handling with SLA (<=4 hrs UK time)',
      'Qualification against your must-haves',
      'Booking, routing, reschedules, show-rate workflows',
      'Light nurture for "not now" + transcripts/QA',
      'Weekly ops call; shared Slack/Teams channel'
    ],
    responsibility: `
11.    FULL MANAGEMENT:
        EZOS Tech handles qualification, booking, routing, and rescheduling.
        EZOS Tech manages "Nurture" flows for "Not Now" leads.

12.    PERFORMANCE GUARANTEE & LIABILITY:
        EZOS Tech assumes full responsibility for infrastructure health and domain rotation.
        EZOS Tech will proactively replace degrading domains at no extra cost to maintain volume.
`
  }
};

export const CONTRACT_META = Object.fromEntries(
  Object.entries(TIERS).map(([key, value]) => [
    key,
    {
      label: value.label,
      tier: value.tier,
      setupFee: value.setupFee,
      monthly: value.monthly
    }
  ])
);

export const CONTRACTS = Object.fromEntries(
  Object.entries(TIERS).map(([key, value]) => {
    const commitmentLine = value.commitment ? `Commitment: ${value.commitment}` : '';
    const deliverables = value.deliverables
      .map((item) => `        ${item}`)
      .join('\n');

    return [
      key,
      `
MASTER SERVICES AGREEMENT - ${value.label} PROTOCOL
Monthly Rate: $${value.monthly.toLocaleString()} | Setup: $${value.setupFee.toLocaleString()}
${commitmentLine}
Capacity: ${value.capacity}
${value.domains}

${COMMON_TERMS}

10.    DELIVERABLES:
        ${deliverables}

${value.responsibility}
${ADDONS}
${TERMS_FIT}
`
    ];
  })
);
