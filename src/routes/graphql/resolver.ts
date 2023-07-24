import { GraphQLResolveInfo } from 'graphql';
import { ResolveTree, parseResolveInfo, simplifyParsedResolveInfoFragmentWithType } from 'graphql-parse-resolve-info';
import { PrismaClient } from '@prisma/client';
import { UserResolverCondition } from './types/UserResolverCondition.js';

async function usersResolver(resolveInfo: GraphQLResolveInfo, prisma: PrismaClient, id: string) {
    const { isPostsRequested, isProfileRequested } = getInclude(resolveInfo);
    return prisma.user.findMany(getCondition(id, isPostsRequested, isProfileRequested));
}

async function userResolver(resolveInfo: GraphQLResolveInfo, prisma: PrismaClient, id: string) {
    const { isPostsRequested, isProfileRequested } = getInclude(resolveInfo);
    return prisma.user.findUnique(getCondition(id, isPostsRequested, isProfileRequested));
}

function getCondition(id: string, isPostsRequested: boolean, isProfileRequested: boolean): UserResolverCondition {
    return {
        where: { id },
        include: {
            posts: {
                select: {
                    id: isPostsRequested,
                }
            },
            profile: { include: { memberType: { select: { id: isProfileRequested } } } },
        }
    };
}

function getInclude(resolveInfo: GraphQLResolveInfo): { isPostsRequested: boolean; isProfileRequested: boolean; } {
    const parsedResolveInfoFragment = parseResolveInfo(resolveInfo);
    const { fields } = simplifyParsedResolveInfoFragmentWithType(
        parsedResolveInfoFragment as ResolveTree,
        resolveInfo.returnType
    );

    const isPostsRequested = 'posts' in fields;
    const isProfileRequested = 'profile' in fields;

    return { isPostsRequested, isProfileRequested }
}

export { usersResolver, userResolver }
