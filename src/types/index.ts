export interface PwdInfo {
     id: string
     name: string
     user: string
     pwd: string,
     create: string,
     update?: string,
     history?: [PwdHistory]
}

interface PwdHistory {
     time: string,
     oldName: string,
     newName: string,
     oldUser: string,
     newUser: string,
     oldPwd: string,
     newPwd: string
}
