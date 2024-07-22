import type { NextApiRequest, NextApiResponse } from "next"

export function getOffsetAndLimitFromReq(req: NextApiRequest, maxLimit = 100, MaxOffset = 10000) {
    // const queryLimit = +(req.query.limit as string || "0")
    const queryLimit = parseInt(req.query.limit as string || "0")
    const queryOffset = parseInt(req.query.offset as string || "0")

    let limit = 10

    if (queryLimit > 0 && queryLimit < maxLimit) {
        limit = queryLimit
    } else if (queryLimit > maxLimit) { limit = maxLimit }

    const offset = ((queryOffset < MaxOffset) ? queryOffset : 0)
    return { limit, offset }
}