import { Request, Response } from 'express';
import DataService from '../services/dataService';
import { z } from 'zod';

class DataController {
    
    async getData(req: Request, res: Response) {
        try {
            const data = await DataService.getData();
            res.json(data);
        } catch (err) {
            res.status(500).json({ message: 'Ошибка при получении данных' });
        }
    }

    async addCitizen(req: Request, res: Response) {
        try {
            const result = await DataService.addCitizen(req.body);
            res.json(result);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Ошибка при добавлении жителя' });
        }
    }
}

export default new DataController();