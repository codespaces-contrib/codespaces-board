import { IParsedComment } from '../interfaces/IParsedComment';
import { IParsedIssue } from '../interfaces/IParsedIssue';

export const parseIssueUrl = (issueUrl: string): IParsedIssue | null => {
  const uri = new URL(issueUrl);
  const { pathname } = uri;

  if (uri.hostname !== 'github.com') {
    return null;
  }

  const split = pathname.split('/');

  return {
    owner: split[1],
    repo: split[2],
    issueNumber: parseInt(split[4], 10),
  };
}

export const parseCommentUrl = (issueUrl: string): IParsedComment | null => {
  const uri = new URL(issueUrl);
  const { pathname, hash } = uri;

  if (uri.hostname !== 'github.com') {
    return null;
  }

  const split = pathname.split('/');

  return {
    owner: split[1],
    repo: split[2],
    issueNumber: parseInt(split[4], 10),
    commentId: parseInt(hash.split('#issuecomment-')[1], 10),
  };
}

export const parseIssueApiUrl = (issueUrl: string): IParsedIssue => {
  const uri = new URL(issueUrl);
  const { pathname } = uri;

  const split = pathname.split('/');

  return {
    owner: split[2],
    repo: split[3],
    issueNumber: parseInt(split[5], 10),
  };
}
