export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type CensusData = {
    census: number;
    date: string;
}

export type OpportunityData = {
    date: string;
    title: string;
    body: string;
    priority: string;
}


export type HuddleData = {
    id: string;
    date: Date;
    census: number;
    tpn_count: number;
    haz_count: number;
    non_sterile_count: number;
    opportunities: {
        body: string;
        date: Date;
        title: string;
        priority: 'low' | 'medium' | 'high'
    }[];
}