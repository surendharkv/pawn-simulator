export const enum BoardErrors {
  outboud = 'The x/y coordinate falls outside board limit',
  insufficient = 'Control inputs insufficient to execute command',
  unplaced = 'Place a piece before other actions',
  placeOnTop = 'Cannot place a piece on top of another',
  notfirst = 'Cannot make 2 steps after first move',
  noPiece = 'No Piece in square to execute action',
  capture = 'Capture piece not part of scope',
  nothing = 'Nothing to report',
}
