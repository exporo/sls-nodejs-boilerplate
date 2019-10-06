import jwt from 'jsonwebtoken';
import jwk from 'jwks-rsa';

import * as fs from 'fs';

export class jwtAuth implements middlewareInterface {
    public allow = (req) => {
        try {
            const token = req.header['bearer token'];

            //TODO add cache from hashed token

            const decodedToken = jwt.decode(token, {complete: true});

            const pem = this.getJwk(decodedToken.header, config);

            const decoded = jwt.verify(token, pem, {
                audience: 'urn:foo', //TODO use config
                issuer: 'urn:issuer', //TODO use config
                algorithms: ['RS256'] //TODO use config
            });

            return <middlewareReturnInterface>{
                allow: true,
                authenticatedUser: decoded,
            };

        } catch (err) {
            console.log(err);
            return <middlewareReturnInterface>{
                allow: false,
                error: err
            };
        }
    };

    private getJwk = (header: object, config: object) => {

        //TODO add caching

        const jwkClient = jwk({
            //TODO use config
            jwksUri: 'https://sandrino.auth0.com/.well-known/jwks.json'
        });

        const key = jwkClient.getSigningKey(header.kid);

        return key.publicKey || key.rsaPublicKey;

    }
}