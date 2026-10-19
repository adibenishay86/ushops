export async function onRequestPost({request,env}) {
  try {
    const x=await request.json();
    const required=['fullName','packagesTracking','paymentDate','stuckGoodsValue','shippingPaid','contentsDescription'];
    if(required.some(k=>String(x[k]??'').trim()==='')) return Response.json({error:'missing fields'},{status:400});
    const record={id:crypto.randomUUID(),createdAt:new Date().toISOString(),fullName:String(x.fullName).slice(0,200),packagesTracking:String(x.packagesTracking).slice(0,1500),paymentDate:String(x.paymentDate).slice(0,20),stuckGoodsValue:Number(x.stuckGoodsValue),shippingPaid:Number(x.shippingPaid),contentsDescription:String(x.contentsDescription).slice(0,1000)};
    if(!Number.isFinite(record.stuckGoodsValue)||!Number.isFinite(record.shippingPaid)||record.stuckGoodsValue<0||record.shippingPaid<0)return Response.json({error:'invalid amounts'},{status:400});
    // Bind a Cloudflare KV namespace named SUBMISSIONS in Pages settings.
    if(!env.SUBMISSIONS)return Response.json({error:'storage not configured'},{status:500});
    await env.SUBMISSIONS.put(record.id,JSON.stringify(record));
    return Response.json({ok:true});
  } catch { return Response.json({error:'invalid request'},{status:400}); }
}
