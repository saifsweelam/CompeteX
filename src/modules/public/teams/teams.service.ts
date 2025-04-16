import ApiError from "../../../errors/api.error";
import prisma from "../../../lib/db";
import { CreateTeamBody } from "./dto/CreateTeamBody";

export default class TeamsService {
    async createOne(body: CreateTeamBody) {
        // Check if the competition exists
        const competitionExists = await prisma.competition.findUnique({
            where: {
                id: body.competitionId,
            },
        });
        if (!competitionExists) {
            throw new ApiError(404, { field: "competitionId", message: "Competition not found" });
        }
        return prisma.team.create({
            data: {
                name: body.name,
                description: body.description,
                competitionId: body.competitionId,
                members: {
                    createMany: {
                        data: body.members.map((member) => ({
                            name: member.name,
                            email: member.email,
                        })),
                    },
                },
            }
        })
    }
}