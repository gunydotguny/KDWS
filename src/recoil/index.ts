import { atom } from "recoil";
import { v1 } from "uuid";
import { UserProps, userList } from "../datas/user";
import _ from "lodash";

export type NotificationProps = {
  id: string,
  target: string
};

export const userState = atom<UserProps | null>({
  key: `userState/${v1()}`,
  default: userList[_.findIndex(userList, (el) => el.id === '00000000')]
});

export const favoritedCohortState = atom<string[]>({
  key: `favoritedCohortState/${v1()}`,
  default: ["1", "3"]
})

export const favoritedPatientState = atom<string[]>({
  key: `favoritedCohortState/${v1()}`,
  default: ["1", "3"]
})

export const questionModalState = atom<{open: boolean}>({
  key: `questionModalState/${v1()}`,
  default: {
    open: false
  }
})