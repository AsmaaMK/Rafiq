type ToasterType = 'error' | 'success' | 'uploading';

type ToasterInfo = {
  show: boolean;
  type: ToasterType;
  message: string;
};

export { ToasterInfo, ToasterType };
