
export const authLabel = {
    'user': '일반 사용자',
    'refiner': '정제자',
    'refinement_manager': '정제관리자',
}

export type UserProps = {
    id: string,
    name: string,
    title: string,
    auth?: `user` | `refiner` | `refinement_manager`,
    admin: boolean
}

export const userList: UserProps[] = [
    {
        id: `00000000`,
        name: `김보미`,
        title: `의사`,
        auth: `refinement_manager`,
        admin: true,
    }
]