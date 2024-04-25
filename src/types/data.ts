export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface ADS {
  name: string;
  quantity: number;
}

export interface SubCampaigns {
  name: string;
  status: boolean;
  ads: ADS[];
}
export interface Values {
  campaign: {
    information: {
      name: string;
      describe?: string;
    };
    subCampaigns: SubCampaigns[];
  };
}
