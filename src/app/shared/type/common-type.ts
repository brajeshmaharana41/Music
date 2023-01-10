import { Constants } from '../common/constant';
import { SongType } from './main.type';
export interface HttResponseType {
  body: any;
  message: string;
  status: number;
}

export interface SearchSongParamType {
  term?: string;
  mood?: string;
  made_for_you?: string;
  skip?: number;
  limit?: number;
  category?: string;
  artist?: string;
  actor?: string;
  playlist?: string;
}

export interface SearchSongAPIResponseType {
  body: SongType[];
  message: string;
  status: number;
  totalRecord: number;
}

export interface TopPickPerson {
  id: string;
  img: string;
  status: string;
  title: string;
}
