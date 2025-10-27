export interface IGeojsonLayer {
  groupType: string;
  data: GeoJSON.FeatureCollection;
}

export interface IMapLegendData {
  id: string;
  visibility: boolean;
  text: string;
  icon: string;
  color: string;
}
