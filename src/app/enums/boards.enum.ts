import { Square } from '@ps/interfaces';

export type XCoordinate = number;
export type YCoordinate = number;

export type ChessBoard = Array<Array<Square>>;

export const COMMANDS = ['place', 'move', 'left', 'right', 'report'] as const;
export const DIRECTIONS = ['north', 'south', 'west', 'east'] as const;
export const COLORS = ['black', 'white'] as const;
export const CHESSPIECES = { pawn: { white: '&#x2659;', black: '&#x265F;' } };
export const DIRECTIONAXIS = { north: 1, south: -1, west: -1, east: 1 };

export type Command = typeof COMMANDS[number];
export type Direction = typeof DIRECTIONS[number];
export type Color = typeof COLORS[number];
