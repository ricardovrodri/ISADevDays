import axios from "axios";
import { User } from "../models/user.js";

export function getUsers(req, res) {
    User.find().then((users) => {
      res.send(users);
    }).catch(err => {
      res.send({message: err.message});
    });
  }
  
export function findByusername(req, res) {
    const username = res.locals.oas.params.username;

    User.findOne({username}).then((usuario) => {
        res.send(usuario)
    }).catch(err => {
        res.status(500).send({message: err.message});
    });
}

export async function _callGithub(username) {
    const token = '' //falta por añadir funcionalidad token
    const apiUrl = 'https://api.github.com/graphql';
    const requestConfig = { Authorization: "Bearer " + token, Accept: 'application/vnd.github.starfox-preview+json' };
    const query = `{
        user(login: "${username}") {
          status {
            message
          }
          bio
          avatarUrl
          followers(first: 10) {
            nodes {
              login
            }
          }
          following(first: 10) {
            nodes {
              login
            }
          }
          issues(first: 10) {
            nodes {
              title
              state
              createdAt
            }
          }
        }
      }`;
  
    const result = await axios.post(apiUrl, { query }, { headers: requestConfig });
    
    if (result) {
      const userData = result.data.data.user
      const usuario = {
        username: username,
        status: userData.status.message,
        bio: userData.bio,
        avatarUrl: userData.avatarUrl,
        followers: userData.followers.nodes.map(follower => follower.login),
        following: userData.following.nodes.map(following => following.login),
        issues: userData.issues.nodes.map(issue => {
          return {
            title: issue.title,
            state: issue.state,
            createdAt: issue.createdAt
          };
        })
      }
    
      return usuario;
    }
  }

  export async function createUser(req, res) {
    const username = res.locals.oas.params.username;
    _callGithub(username).then((usuario) => {
      User.create(usuario).then((user) => {
        res.status(201).send(user);
      }).catch(err => {
        res.status(500).send({message: err.message});
      });
    }).catch(err => {
      res.status(500).send({message: err.message});
    });
  }
