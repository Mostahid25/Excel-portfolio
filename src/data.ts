/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CoreSkill, StatItem, ExperienceItem, ProjectItem } from "./types";

export const STATS_DATA: StatItem[] = [
  { value: "15+", label: "Projects delivered" },
  { value: "8", label: "Dashboards built" },
  { value: "3", label: "VBA automations" },
  { value: "2", label: "Power BI reports" }
];

export const CORE_SKILLS_DATA: CoreSkill[] = [
  { id: "pivottables", name: "PivotTables & Dashboards", level: "Advanced", percentage: 95 },
  { id: "vbamacros", name: "VBA & Macros", level: "Intermediate", percentage: 75 },
  { id: "powerquery", name: "Power Query", level: "Advanced", percentage: 90 },
  { id: "powerbi", name: "Power BI", level: "Intermediate", percentage: 70 },
  { id: "modeling", name: "Data Modeling", level: "Intermediate", percentage: 75 },
  { id: "formulas", name: "Advanced Formulas", level: "Advanced", percentage: 92 }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "sales-dashboard",
    title: "Sales Performance Dashboard",
    category: "Dashboard",
    description: "Interactive Excel dashboard tracking KPIs, regional sales trends, and rep performance using pivot charts, slicers, and conditional formatting.",
    tags: ["Pivot Charts", "Slicers", "Conditional Formatting"]
  },
  {
    id: "monthly-report",
    title: "Monthly Report Automation",
    category: "Automation",
    description: "VBA macro that auto-generates monthly reports from raw data, formats output, and emails stakeholders — reducing manual effort by 80%.",
    tags: ["VBA", "Macros", "Email Automation"]
  },
  {
    id: "etl-pipeline",
    title: "Multi-source ETL Pipeline",
    category: "Data Pipeline",
    description: "Power Query pipeline that consolidates data from 5 CSV sources, cleans inconsistencies, and feeds a unified data model for analysis.",
    tags: ["Power Query", "ETL", "M Language"]
  },
  {
    id: "financial-powerbi",
    title: "Financial Overview Power BI Report",
    category: "BI Report",
    description: "End-to-end Power BI report with DAX measures, custom visuals, and row-level security for a finance team of 12 stakeholders.",
    tags: ["Power BI", "DAX", "Data Modeling"]
  },
  {
    id: "inventory-demand",
    title: "Inventory Demand Model",
    category: "Forecasting",
    description: "Excel-based demand forecasting model using moving averages, seasonality factors, and scenario analysis to optimize stock levels.",
    tags: ["FORECAST.ETS", "Scenario Manager", "What-If"]
  },
  {
    id: "star-schema",
    title: "Star Schema Data Model",
    category: "Modeling",
    description: "Designed a star schema data model in Excel with fact and dimension tables, enabling efficient cross-table analysis via Power Pivot.",
    tags: ["Power Pivot", "Star Schema", "Relationships"]
  }
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "exp-freelance",
    role: "Excel Analyst (Freelance)",
    company: "Self-employed",
    location: "Remote",
    period: "2023 – Present",
    highlights: [
      "Collaborate as primary developer with cross-industry clients, transforming complex multi-column spreadsheets into interactive, pivot-ready analytical workbooks.",
      "Build optimized dynamic financial models, price optimization sheets, and automated inventory management trackers using advanced formulas (INDEX/MATCH, XLOOKUP, Nested IFs, LAMBDA).",
      "Translate raw datasets from marketing, e-commerce, and logistics domains into intuitive dashboard systems with dynamic charts and custom slicers."
    ]
  },
  {
    id: "exp-intern",
    role: "Data & Reporting Intern",
    company: "Local Business, Khulna",
    location: "Khulna, Bangladesh",
    period: "2022 – 2023",
    highlights: [
      "Ingested, cleaned, and compiled daily operations logs spanning accounting, warehouse, and transactional departments.",
      "Created 15+ automated VBA macro subroutines to format monthly ledgers, eliminating manual calculations and saving approximately 80% manual effort.",
      "Designed and delivered standardized Weekly and Monthly reporting summaries for executive-level reviews in Power BI and Power Pivot."
    ]
  }
];

export const TOOLS_DATA = [
  "Microsoft Excel",
  "Power BI",
  "Power Query",
  "Power Pivot",
  "VBA",
  "DAX",
  "M Language",
  "SQL (basic)",
  "Google Sheets",
  "SharePoint"
];

export const CERTIFICATIONS_DATA = [
  {
    name: "Data Literacy - Datacamp",
    link: "https://www.datacamp.com/skill-verification/DL0034237515940"
  },
  {
    name: "Data Science and Analytics",
    link: "https://www.life-global.org/certificate/e76a3e29-4851-4ce9-aa94-53600711c563"
  }
];

export const BIO_DATA = {
  name: "G.M Mostahid",
  title: "Excel Analyst · Data Modeling · Dashboard Design · Automation",
  about: "Professional Excel Analyst with hands-on experience transforming complex datasets into clear, actionable insights. Proficient in building interactive dashboards, automating workflows with VBA, and engineering data models with Power Query and Power BI. Passionate about turning raw numbers into compelling business narratives.",
  email: "mostahidgm@gmail.com",
  phone: "+8801771426048",
  linkedin: "linkedin.com/in/mostahid",
  location: "Khulna, Bangladesh",
  education: "Bsc in Statistics"
};
