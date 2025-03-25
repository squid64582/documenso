// packages/lib/server-only/landing-page-template/get-landing-page-template.ts
import { AppError, AppErrorCode } from '@documenso/lib/errors/app-error';
import { prisma } from '@documenso/prisma';

export type GetLandingPageTemplateByIdOptions = {
  id: number;
  userId?: number;
  teamId?: number;
};

export const getLandingPageTemplateById = async (options: GetLandingPageTemplateByIdOptions) => {
  const { id, userId, teamId } = options;

  const template = await prisma.landingPageTemplate.findUnique({
    where: {
      id,
    },
  });

  if (!template) {
    throw new AppError(AppErrorCode.NOT_FOUND, { message: 'Landing page template not found' });
  }

  // If userId or teamId is provided, check if the user has access to this template
  if (userId && template.userId !== userId && template.teamId !== teamId) {
    throw new AppError(AppErrorCode.UNAUTHORIZED, { message: 'You do not have access to this template' });
  }

  return template;
};
