//dashboard 

import { Request, Response } from 'express';
import { getAllUsers, getUserById,getRecentEntries } from '../model/user';
import { SuccessResponse, ErrorResponse } from '../utils/res';
import { isAdmin } from '../utils/adminAccess';


export const getDashboardStats = async (req: Request, res: Response) => {
    try {
        const userRole = req.headers['role'] as string;
           if (!isAdmin(userRole)) {
        //get only one user 
        const userId = req.headers['user-id'] as string;
        const user = await getUserById(userId);
        if (!user) {
            return ErrorResponse(res, 'User not found', 404);
        }

        return SuccessResponse(res, 'Dashboard stats retrieved successfully', { user });
      } 
      //if is admin get all starts
        const totalInters = await getAllUsers('intern');
        const totalcoppers = await getAllUsers('copper');
        const students = await getAllUsers('student');
        
        const stats = {
            totalEntries: totalInters.length + totalcoppers.length + students.length,
            totalInters : totalInters.length,
            totalcoppers: totalcoppers.length,
            totalStudents: students.length
        };
        //get recent  entries
        const recentEntries = await getRecentEntries();
        return SuccessResponse(res, 'Dashboard stats retrieved successfully', { stats, recentEntries });

    }catch (error) {
        console.error('Error fetching dashboard stats:', error);
        return ErrorResponse(res, 'An error occurred while fetching dashboard stats', 500);
    }
}