/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CoreSkill {
  id: string;
  name: string;
  level: "Advanced" | "Intermediate" | "Expert";
  percentage: number;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: "Dashboard" | "Automation" | "Data Pipeline" | "BI Report" | "Forecasting" | "Modeling";
  description: string;
  tags: string[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  organization: string;
  subject: string;
  message: string;
  date: string;
}
