// lib/activity-logger.ts

import db from "@/lib/db"

interface LogActivityParams {
  userId?: string
  event: string
  type: string
  effected: string
  details?: any
  ipAddress?: string
  userAgent?: string
}

export async function logActivity(params: LogActivityParams) {
  try {
    const log = await db.activityLog.create({
      data: {
        userId: params.userId,
        event: params.event,
        type: params.type,
        effected: params.effected,
        details: params.details,
        ipAddress: params.ipAddress,
        userAgent: params.userAgent,
        timestamp: new Date()
      }
    })
    return log
  } catch (error) {
    console.error('Failed to log activity:', error)
  }
}

// Contoh penggunaan:
// await logActivity({
//   userId: user.id,
//   event: 'Profile Update',
//   type: 'Update',
//   effected: `User: ${user.email}`,
//   details: { old: oldData, new: newData },
//   ipAddress: req.ip,
//   userAgent: req.headers['user-agent']
// })