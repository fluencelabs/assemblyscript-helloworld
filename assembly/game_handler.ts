import {decode, GetBalanceRequest, JoinRequest, Request, RollRequest, UnknownRequest} from "./request";
import {ErrorResponse} from "./response";
import {GameManager} from "./dice";

let gameManager = new GameManager();

// returns string, because serialization to a byte array is not compatible with our invoke handlers
export function handler(requestBytes: Uint8Array): string {

    let request: Request = decode(requestBytes);

    if (request instanceof JoinRequest) {
        return gameManager.join().serialize();
    } else if (request instanceof RollRequest) {
        return gameManager.roll(request.playerId, request.betPlacement, request.betSize).serialize();
    } else if (request instanceof GetBalanceRequest) {
        return gameManager.getBalance(request.playerId).serialize();
    } else if (request instanceof UnknownRequest) {
        return new ErrorResponse(request.message).serialize();
    }

    let response = new ErrorResponse("Unereachable: " + request.action);
    return response.serialize();
}
