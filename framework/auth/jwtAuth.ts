import jwt from 'jsonwebtoken';
import * as jwk from 'jwks-rsa';
import {AuthProviderInterface} from "./authProviderInterface";

export class JwtAuth implements AuthProviderInterface {
    public authenticate = (req) => {
        try {
            const token = req.header['bearer token'];

            //TODO add cache by hashed token

            const decodedToken = jwt.decode(token, {complete: true});

            const pem = this.getJwk(decodedToken.header, config);

            const decoded = jwt.verify(token, pem, {
                audience: 'urn:foo', //TODO use config
                issuer: 'urn:issuer', //TODO use config
                algorithms: ['RS256'] //TODO use config
            });

            return decoded;

        } catch (err) {
            throw {

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