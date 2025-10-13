interface IPointProp {
  type: string;
  geometry: { type: string; coordinates: [number, number] };
  properties: { id: string; name: string };
}

export interface IPointLayer {
  groupType: string;
  features: IPointProp[];
}
