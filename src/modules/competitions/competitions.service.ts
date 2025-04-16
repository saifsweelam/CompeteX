import prisma from "../../lib/db";
import { GetCompetitionsQuery } from "./dto/GetCompetitionsQuery";

export default class CompetitionsService {
    getMany = async (query: GetCompetitionsQuery) => {
        const { page, limit } = query;
        const offset = (page - 1) * limit;
        return await prisma.competition.findMany({
            take: limit,
            skip: offset,
            orderBy: query.sortBy ? {
                [query.sortBy]: query.sortOrder,
            } : undefined,
            where: {
                name: query.search ? {
                    contains: query.search,
                } : undefined,
            },
        });
    }

    getOne = async (id: number) => {
        return await prisma.competition.findUnique({
            where: { id },
        });
    }
}
