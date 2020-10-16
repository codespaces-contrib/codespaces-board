import { ProjectsOctoKit } from '../octokit/ProjectsOctoKit';
import { TColumnTypes } from '../interfaces/TColumnTypes';
import { TProject } from '../interfaces/TProject';
import { IRepoSourceConfig } from '../interfaces/IRepoSourceConfig';
import { IProjectData } from '../interfaces/IProjectData';

export const getProjectData = async (
  projectKit: ProjectsOctoKit,
  repo: IRepoSourceConfig,
  project: TProject
): Promise<IProjectData> => {
  const columns = await projectKit.getColumns(project);
  const issues = await projectKit.getRepoIssues(repo);

  const backlogIssues = await projectKit.filterIssuesForColumnCards(
    issues,
    columns,
    TColumnTypes.Backlog
  );

  const committedIssues = await projectKit.filterIssuesForColumnCards(
    issues,
    columns,
    TColumnTypes.Committed
  );

  const blockedIssues = await projectKit.filterIssuesForColumnCards(
    issues,
    columns,
    TColumnTypes.Blocked
  );

  const progressIssues = await projectKit.filterIssuesForColumnCards(
    issues,
    columns,
    TColumnTypes.InProgress
  );

  const inReviewIssues = await projectKit.filterIssuesForColumnCards(
    issues,
    columns,
    TColumnTypes.InReview
  );

  const waitingToDeployIssues = await projectKit.filterIssuesForColumnCards(
    issues,
    columns,
    TColumnTypes.WaitingToDeploy
  );

  const doneIssues = await projectKit.filterIssuesForColumnCards(
    issues,
    columns,
    TColumnTypes.Done
  );

  const inWorkIssues = [...progressIssues, ...inReviewIssues];
  const doneOrDeployIssues = [...waitingToDeployIssues, ...doneIssues];
  const allPlannedIssues = [...blockedIssues, ...committedIssues, ...inWorkIssues, ...doneOrDeployIssues];

  return {
    // combined
    inWorkIssues,
    doneOrDeployIssues,
    allPlannedIssues,
    // plain
    backlogIssues,
    committedIssues,
    progressIssues,
    inReviewIssues,
    blockedIssues,
    waitingToDeployIssues,
    doneIssues,
  };
};