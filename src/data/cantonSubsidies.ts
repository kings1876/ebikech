import { CantonSubsidy } from '../types';

export const CANTON_SUBSIDIES: CantonSubsidy[] = [
  {
    cantonCode: 'GE',
    cantonName: 'Genève / Genf',
    amountCHF: 'bis CHF 500.-',
    eligibleTypes: 'E-Bikes 25 km/h & E-Cargo',
    conditions: {
      de: 'Förderbeitrag von CHF 250 für normale E-Bikes und CHF 500 für Cargo-Bikes bei Wohnsitz im Kanton Genf.',
      fr: 'Subvention de 250 CHF pour vélo à assistance électrique et 500 CHF pour vélo cargo.',
      it: 'Contributo di 250 CHF per e-bike e 500 CHF per bici cargo con residenza a Ginevra.',
    },
    officialLinkText: 'ge.ch/mobilite',
  },
  {
    cantonCode: 'BE',
    cantonName: 'Bern / Berne',
    amountCHF: 'bis CHF 600.-',
    eligibleTypes: 'E-Cargobikes & Pendler-Velos',
    conditions: {
      de: 'Stadt Bern und Partner-Energiestädte bezuschussen Cargo-Bikes für Familien und Gewerbe mit bis zu CHF 600.',
      fr: 'La Ville de Berne et les cités de l’énergie financent les vélos cargos jusqu’à 600 CHF.',
      it: 'La città di Berna e i comuni sostenibili finanziano le cargo bike fino a 600 CHF.',
    },
    officialLinkText: 'bern.ch/energie',
  },
  {
    cantonCode: 'BS',
    cantonName: 'Basel-Stadt',
    amountCHF: 'bis CHF 800.-',
    eligibleTypes: 'E-Transportvelos (Cargo)',
    conditions: {
      de: 'Der Kanton Basel-Stadt fördert die Anschaffung von elektrischen Lastenvelos mit 20% des Kaufpreises (max. CHF 800).',
      fr: 'Le canton de Bâle-Ville prend en charge 20 % du prix d’achat d’un vélo cargo (max. 800 CHF).',
      it: 'Il Canton Basilea Città copre il 20% del costo di una cargo bike elettrica (max 800 CHF).',
    },
    officialLinkText: 'energie.bs.ch',
  },
  {
    cantonCode: 'VD',
    cantonName: 'Vaud / Waadt (Lausanne)',
    amountCHF: 'bis CHF 800.-',
    eligibleTypes: 'E-Bikes & Cargo',
    conditions: {
      de: 'Stadt Lausanne und diverse Waadtländer Gemeinden vergüten CHF 300 bis 800 beim Kauf bei lokalem Fachhändler.',
      fr: 'La Ville de Lausanne et de nombreuses communes vaudoises accordent entre 300 et 800 CHF.',
      it: 'La città di Losanna e comuni del Vaud offrono contributi tra 300 e 800 CHF.',
    },
    officialLinkText: 'lausanne.ch/subventions-velo',
  },
  {
    cantonCode: 'ZH',
    cantonName: 'Zürich',
    amountCHF: 'CHF 200 – 600.-',
    eligibleTypes: 'E-Bikes & Lastenvelos',
    conditions: {
      de: 'Kommunale Programme in Zürcher Energiestädten (Uster, Wädenswil, Dübendorf, Dietikon, etc.) für Pendler und Familien.',
      fr: 'Programmes communaux dans les cités de l’énergie zurichoises pour navetteurs et familles.',
      it: 'Programmi comunali nei distretti zurighesi per pendolari e famiglie.',
    },
    officialLinkText: 'zh.ch/energie-mobilitaet',
  },
  {
    cantonCode: 'SG',
    cantonName: 'St. Gallen',
    amountCHF: 'bis CHF 500.-',
    eligibleTypes: 'E-Bikes & S-Pedelecs 45 km/h',
    conditions: {
      de: 'Förderung für Pendler zum Ersatz des fossilen Arbeitswegs. Vorlage des ÖV-Abonnements oder Arbeitswegs erforderlich.',
      fr: 'Aide aux pendulaires pour le report modal. Présentation d’un abonnement de transport ou justificatif.',
      it: 'Incentivo pendolari per la mobilità sostenibile con attestato tragitto casa-lavoro.',
    },
    officialLinkText: 'stadt.sg.ch',
  },
  {
    cantonCode: 'TI',
    cantonName: 'Ticino / Tessin',
    amountCHF: 'CHF 300 – 500.-',
    eligibleTypes: 'E-Bike e Cargobike',
    conditions: {
      de: 'Diverse Tessiner Gemeinden (Lugano, Bellinzona, Mendrisio) unterstützen den Kauf emissionsfreier Zweiräder.',
      fr: 'Plusieurs communes tessinoises (Lugano, Bellinzone) soutiennent l’achat de deux-roues électriques.',
      it: 'Diversi comuni ticinesi (Lugano, Bellinzona, Locarno, Mendrisio) sostengono l’acquisto di e-bike.',
    },
    officialLinkText: 'ti.ch/aria-pulita',
  },
];
