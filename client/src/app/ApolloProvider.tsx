import React from "react";
import { useAppSelector } from "./store";
import { createUploadLink } from "apollo-upload-client";

import { ApolloClient, InMemoryCache, ApolloProvider, split, ApolloLink, Operation, FetchResult, Observable } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";
import { Client, ClientOptions, createClient } from "graphql-ws";
import { GraphQLError, print } from "graphql";

import { REACT_APP_GRAPHQL_URI, REACT_APP_WEBSOCKET_URL } from "./config";

class WebSocketLink extends ApolloLink {
    private client: Client;

    constructor(options: ClientOptions) {
        super();
        this.client = createClient(options);
    }

    public request(operation: Operation): Observable<FetchResult> {
        return new Observable((sink) => {
            return this.client.subscribe<FetchResult>(
                { ...operation, query: print(operation.query) },
                {
                    next: sink.next.bind(sink),
                    complete: sink.complete.bind(sink),
                    error: (err) => {
                        if (err instanceof Error) {
                            return sink.error(err);
                        }

                        if (err instanceof CloseEvent) {
                            return sink.error(
                                // reason will be available on clean closes
                                new Error(`Socket closed with event ${err.code} ${err.reason || ""}`)
                            );
                        }

                        return sink.error(new Error((err as GraphQLError[]).map(({ message }) => message).join(", ")));
                    },
                }
            );
        });
    }
}

const MyApolloProvider: React.FC = ({ children }) => {
    const { accessToken } = useAppSelector((state) => state.account);

    const httpLink = createUploadLink({
        uri: REACT_APP_GRAPHQL_URI,
    });

    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                authenticate: accessToken ? accessToken : "",
            },
        };
    });

    const wsLink = new WebSocketLink({
        url: REACT_APP_WEBSOCKET_URL,
    });

    const splitLink = split(({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === "OperationDefinition" && definition.operation === "subscription";
    }, wsLink);

    const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: ApolloLink.from([authLink.concat(splitLink), httpLink as any]),
    });

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default MyApolloProvider;
