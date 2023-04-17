import * as service from '../services/UserService.js';

export function getGitaccounts(req, res) {
    service.getGitaccounts(req, res);
}

export function findByusername(req, res) {
    service.findByusername(req, res);
}

export function createUser(req, res) {
    service.createUser(req, res);
}
