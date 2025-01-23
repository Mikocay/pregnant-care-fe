import { RootState } from "@/redux/store";

export const selectCount = (state: RootState) => state.counter.value;