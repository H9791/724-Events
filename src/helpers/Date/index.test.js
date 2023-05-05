/** Testing date helper component
 * 
 */

import { getMonth } from "./index";

describe("Date helper", () => {
    describe("When getMonth is called", () => {
        it("the function return janvier for 2022-01-01 as date", () => {
            // to implement
            expect (getMonth(new Date("2022-01-01")) === "janvier" ).toBeTruthy();
        });
        it("the function return juillet for 2022-07-08 as date", () => {
            // to implement
            expect (getMonth(new Date("2022-07-08"))).toEqual("juillet")
        });
    });
})

