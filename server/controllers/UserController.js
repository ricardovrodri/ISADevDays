import * as service from '../services/UserService.js';

export function getGitaccounts(req, res) {
    service.getGitaccounts(req, res);
}

export function findByusername(req, res) {
    service.findByusername(req, res);
}

