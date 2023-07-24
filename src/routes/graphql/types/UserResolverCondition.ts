export interface UserResolverCondition {
  where: { id: string };
  include: {
    posts: { select: { id: boolean } };
    profile: { include: { memberType: { select: { id: boolean } } } };
  };
}
