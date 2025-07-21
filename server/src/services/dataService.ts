import Citizen from '../models/Citizen';
import City from '../models/City';


class DataService {

    async getData() {
        const citizens = await Citizen.find({});
        const cities = await City.find({});

        const cityMap = new Map(cities.map(c => [c.id, c]));

        // Все возможные уровни
        const fullHierarchy = ['country', 'city', 'district', 'street', 'house'];

        const buildTree = (data: any[]) => {
            const tree: any = {};

            for (const person of data) {
                let current = tree;

                // Проходим по всем уровням в фиксированном порядке
                for (const level of fullHierarchy) {
                    const group = person.groups.find((g: any) => g.type === level);
                    if (!group) continue;

                    if (!current[group.name]) {
                        current[group.name] = {};
                    }
                    current = current[group.name];
                }

                if (!current.residents) {
                    current.residents = [];
                }

                current.residents.push({
                    id: person.id,
                    name: person.name,
                    cityInfo: cityMap.get(person.city_id) ?? null,
                });
            }

            return tree;
        };

        return buildTree(citizens);
    }


    async addCitizen(data: {
        name: string;
        country?: string;
        city?: string;
        district?: string;
        street?: string;
        house?: string;
    }) {
        const { name } = data;

        if (!name) throw new Error("Name is required");

        const groupOrder = ['country', 'city', 'district', 'street', 'house'];

        // Формируем groups по имеющимся полям
        const groups = groupOrder
            .filter(key => data[key as keyof typeof data])
            .map(key => ({
                type: key,
                name: data[key as keyof typeof data] as string
            }));

        // Получаем город по имени
        const cityGroup = groups.find(g => g.type === 'city');
        const cityDoc = cityGroup
            ? await City.findOne({ name: cityGroup.name })
            : null;

        // Получаем уникальный ID (макс+1)
        const lastCitizen = await Citizen.findOne().sort({ id: -1 });
        const newId = lastCitizen ? lastCitizen.id + 1 : 0;

        const newCitizen = await Citizen.create({
            id: newId,
            name,
            groups,
            city_id: cityDoc?.id ?? null
        });

        return newCitizen;
    }
}

export default new DataService();
