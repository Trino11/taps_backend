import db from '../database'

const permissions = (myparam: string) => {
    return async (req: any, res: any, next: Function) => {
        try {
            let perms: { permissions: string }[] = []
            let perm: { permissions: string }[]
            for (let role of req.session.roles) {
                perm = await db.query(`SELECT permissions FROM roles WHERE name = '${role}'`)
                perms.push({ permissions: perm[0].permissions });

            }

            for (let perm of perms) {
                if (perm?.permissions.includes(myparam)) {
                    next()
                    return
                }
            }
            throw new Error()
        } catch (error) {
            res.status(403).json({ msg: "You dont have enought perms to perform this action." })
        }

    }
}
export default permissions