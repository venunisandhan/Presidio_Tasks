const request = require('supertest');

const app = require('../src/server')

describe('GET /health', ()=>{
    it('returns 200 with status ok' , async () =>{
        const res = await request(app).get('/health');
        expect(res.status).toBe(200);
        expect(res.body.status).toBe('ok');
    });
});

describe('POST /items', () => {
    it('creates new item and return 201', async ()=>
    {
       const res = await request(app)
                  .post('/items')
                  .send({name : 'Mango' , price : 25})
                  .set('Content-Type','application/json');
        expect(res.status).toBe(201);
        expect(res.body.data.name).toBe('Mango');
        expect(res.body.data.price).toBe(25);
    });

    it('returns 400 if name missing' , async () => {
        const res = await request(app)
                          .post('/items')
                          .send({price:1});
        expect(res.status).toBe(400);
    });
});