import db from '../database'

const sessions = async (req: any, res: any, next: Function) => {
    try {
        if ((!req.session.uid || !req.session.role) && req.uid) {
            const user: { uid: number, role: string }[] = await db.query(`SELECT u.id AS "uid", r.name AS "role" FROM users u, userxroles ur, roles r WHERE u.id = ur.userId AND ur.roleId = r.id AND u.id = ${req.uid}`)
            if (user[0]) {
                let roles: Array<string> = []
                for (let i = 0; i < user.length; i++)
                    roles.push(user[i].role)

                req.session.uid = user[0].uid
                req.session.roles = roles
            }
        }
        next()
    }
    catch (error: any) {
        console.error(error)
    }
}

export default sessions