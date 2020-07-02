export const API_URL = `${document.location.protocol}//${document.location.hostname}${
  process.env.NODE_ENV === 'development' ? ':5000' : ''
}`;
export const JWT_ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZ29vZ2xlSWQiOiIxMDQwOTkwMDExNTc3MDE5MjgxMDciLCJ1cGRhdGVkQXQiOiIyMDIwLTAxLTA1VDA4OjUzOjI1LjE5M1oiLCJjcmVhdGVkQXQiOiIyMDIwLTAxLTA1VDA4OjUzOjI1LjE5M1oiLCJuYW1lIjpudWxsLCJyZWdOciI6bnVsbCwiZW1haWwiOm51bGwsInBob25lTnIiOm51bGwsImNvdW50cnkiOm51bGwsImNvdW50eSI6bnVsbCwiY2l0eSI6bnVsbCwic3RyZWV0IjpudWxsLCJwb3N0YWxDb2RlIjpudWxsLCJpYXQiOjE1NzgyMTQ0MDV9.tXsRm_-TfHk93u97MQ7oDDFEaSt_kZX-FefrK-6DuUQ';
