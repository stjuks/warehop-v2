import ApolloClient from 'apollo-boost';

const apollo = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    request: operation => {
        const token =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZ29vZ2xlSWQiOiIxMDQwOTkwMDExNTc3MDE5MjgxMDciLCJ1cGRhdGVkQXQiOiIyMDIwLTAxLTA1VDA4OjUzOjI1LjE5M1oiLCJjcmVhdGVkQXQiOiIyMDIwLTAxLTA1VDA4OjUzOjI1LjE5M1oiLCJuYW1lIjpudWxsLCJyZWdOciI6bnVsbCwiZW1haWwiOm51bGwsInBob25lTnIiOm51bGwsImNvdW50cnkiOm51bGwsImNvdW50eSI6bnVsbCwiY2l0eSI6bnVsbCwic3RyZWV0IjpudWxsLCJwb3N0YWxDb2RlIjpudWxsLCJpYXQiOjE1NzgyMTQ0MDV9.tXsRm_-TfHk93u97MQ7oDDFEaSt_kZX-FefrK-6DuUQ';
        operation.setContext({
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
});

export default apollo;
