const reply=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}});
export default {async fetch(request,env){
  const url=new URL(request.url);
  if(url.pathname==="/api/health") return reply({ok:true});
  if(url.pathname==="/api/submit"){
    if(request.method!=="POST") return reply({error:"Method Not Allowed"},405);
    if(!env.SUBMISSIONS) return reply({error:"SUBMISSIONS KV binding is not configured"},500);
    try{
      const x=await request.json();
      const required=["fullName","packagesTracking","paymentDate","stuckGoodsValue","shippingPaid","contentsDescription"];
      if(required.some(k=>String(x[k]??"").trim()==="")) return reply({error:"Missing required fields"},400);
      const email=String(x.email??"").trim(),phone=String(x.phone??"").trim();
      if(!email&&!phone) return reply({error:"Email or phone is required"},400);
      if(email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return reply({error:"Invalid email"},400);
      const goods=Number(x.stuckGoodsValue),shipping=Number(x.shippingPaid);
      if(!Number.isFinite(goods)||!Number.isFinite(shipping)||goods<0||shipping<0) return reply({error:"Invalid amounts"},400);
      const record={id:crypto.randomUUID(),createdAt:new Date().toISOString(),fullName:String(x.fullName).trim().slice(0,200),email:email.slice(0,254),phone:phone.slice(0,30),packagesTracking:String(x.packagesTracking).trim().slice(0,1500),paymentDate:String(x.paymentDate).trim().slice(0,20),stuckGoodsValue:goods,shippingPaid:shipping,contentsDescription:String(x.contentsDescription).trim().slice(0,1000)};
      await env.SUBMISSIONS.put(record.id,JSON.stringify(record));
      return reply({ok:true,id:record.id});
    }catch{return reply({error:"Invalid request"},400)}
  }
  return env.ASSETS.fetch(request);
}};
