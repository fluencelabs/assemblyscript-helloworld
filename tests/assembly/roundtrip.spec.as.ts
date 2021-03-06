import "allocator/buddy";

import { invoke } from "../../assembly/index";

declare function logStr(str: string): void;
declare function logF64(val: f64): void;

export class SomeTest {

    static shouldHandleEmptyObject(): bool {
        this.roundripTest("{\"action\": \"Join\"}");
        this.roundripTest("{\"action\": \"Roll\", \"player_id\": 0, \"bet_placement\": 1, \"bet_size\": 10}");
        this.roundripTest("{\"action\": \"Roll\", \"player_id\": 0, \"bet_placement\": 1, \"bet_size\": 10}");
        this.roundripTest("{\"action\": \"Roll\", \"player_id\": 0, \"bet_placement\": 1, \"bet_size\": 10}");
        return this.roundripTest("{\"action\": \"Roll\", \"player_id\": 1, \"bet_placement\": 1, \"bet_size\": 10}");
    }

    private static roundripTest(jsonString: string): bool {
        logStr("----------------------------------------------");
        let inputLen = jsonString.lengthUTF8;
        let utf8ptr = jsonString.toUTF8();

        let resultPtr = invoke(utf8ptr, inputLen);

        let resultLength: i32 = 0;

        for (let i = 3; i >= 0; i--) {
            let b = load<u8>(resultPtr + i) as i32;
            resultLength = resultLength + b << i * 8;
        }

        logStr("result: " + String.fromUTF8(resultPtr + 4, resultLength));

        return true;
    }
}

