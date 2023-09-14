import axios from 'axios';
import { Player } from '../types';

export const fetchPlayers = async (searchQuery: string = ''): Promise<Player[]> => {
  try {
    const url = `https://www.balldontlie.io/api/v1/players?search=${searchQuery}`;
    console.log('sending nba api request', { url });
    const response = await axios.get(url);
    console.log('got nba api response', { url, response });
    return response.data.data as Player[];
  } catch (error) {
    // todo: log error in a monitoring service
    throw error;
  }
};
