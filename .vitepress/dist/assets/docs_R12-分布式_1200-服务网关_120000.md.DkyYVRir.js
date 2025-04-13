import{_ as i,C as p,c as e,o as l,j as a,G as t,ai as h,a as k}from"./framework-Cfw8I1ux.js";const A=JSON.parse('{"title":"网关鉴权","description":"","frontmatter":{},"headers":[],"relativePath":"docs/R12-分布式/1200-服务网关/120000.md","filePath":"docs/R12-分布式/1200-服务网关/120000.md"}'),d={name:"docs/R12-分布式/1200-服务网关/120000.md"};function r(c,s,o,g,y,E){const n=p("ArticleMetadata");return l(),e("div",null,[s[0]||(s[0]=a("h1",{id:"网关鉴权",tabindex:"-1"},[k("网关鉴权 "),a("a",{class:"header-anchor",href:"#网关鉴权","aria-label":'Permalink to "网关鉴权"'},"​")],-1)),t(n),s[1]||(s[1]=h(`<p>在多服务架构下，用户需访问多个业务模块，如订单、用户、支付等系统。若各系统独立认证，不仅体验割裂、开发成本高，还容易产生安全隐患。为此，需引入统一的 API 网关 + SSO + Redis 权限缓存 模式，实现以下目标： ✅ 用户只需登录一次，所有服务可无缝访问。 ✅ 通过网关实现统一鉴权、权限拦截、请求路由。 ✅ 利用 Redis 缓存权限与 Token，提高性能，减轻后端压力。 ✅ 提供灵活的权限体系，支持动态刷新与扩展。</p><h2 id="系统架构" tabindex="-1">系统架构 <a class="header-anchor" href="#系统架构" aria-label="Permalink to &quot;系统架构&quot;">​</a></h2><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">------------+         +-----------+          +-------------+</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">|   Client   | </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">-----&gt;  |  网关服务  |  -----&gt;  |   业务系统    |</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">------------+         +-----------+          +-------------+</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                            |</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                            v</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">                    +</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">---------------+</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                    |   鉴权模块    |</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">                    +</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">---------------+</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                            |</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">          +</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">----------------+----------------+</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          |                                 |</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          v                                 v</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   +</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">-------------+                  +---------------+</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   |     Redis    | </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">---------&gt;     |     单点登录     |</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   +</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">-------------+                  +---------------+</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                                         |</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                                         v</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">                                  +</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">-------------+</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                                  |  用户中心  |</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">                                  +</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">-------------+</span></span></code></pre></div><h2 id="功能说明" tabindex="-1">功能说明 <a class="header-anchor" href="#功能说明" aria-label="Permalink to &quot;功能说明&quot;">​</a></h2><ol><li>统一登录流程 用户访问 /login，由 API 网关白名单放行至 SSO 系统。</li></ol><p>SSO 系统校验用户信息，通过后生成 Token（如 JWT），设置过期时间。</p><p>同时调用 用户中心 拉取权限（角色/菜单/按钮级权限），缓存入 Redis。</p><p>最终响应包含 Token，由前端存储（如 Header、Cookie）。</p><ol start="2"><li>统一鉴权流程 网关拦截所有业务请求，提取 Header 中的 Token。</li></ol><p>查询 Redis 中 token:{token} 是否存在。</p><p>如果 Token 失效，返回 401 Unauthorized。</p><p>查询 Redis 中 auth:{uid} 是否存在。</p><p>若无权限缓存，返回 403 Forbidden。</p><p>鉴权通过后，将请求转发至对应业务服务。</p><h2 id="时序图" tabindex="-1">时序图 <a class="header-anchor" href="#时序图" aria-label="Permalink to &quot;时序图&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>@startuml</span></span>
<span class="line"><span>actor User</span></span>
<span class="line"><span>participant &quot;API Gateway&quot; as Gateway</span></span>
<span class="line"><span>participant &quot;SSO 登录服务&quot; as SSO</span></span>
<span class="line"><span>participant &quot;用户中心 UC&quot; as UC</span></span>
<span class="line"><span>participant Redis</span></span>
<span class="line"><span>participant &quot;业务系统&quot; as Biz</span></span>
<span class="line"><span></span></span>
<span class="line"><span>== 首次登录流程 ==</span></span>
<span class="line"><span>User -&gt; Gateway : POST /login</span></span>
<span class="line"><span>Gateway -&gt; SSO : 放行请求</span></span>
<span class="line"><span>SSO -&gt; SSO : 验证账号密码</span></span>
<span class="line"><span>SSO -&gt; Redis : 存储 token:xxx (设置TTL)</span></span>
<span class="line"><span>SSO -&gt; UC : 查询用户权限信息</span></span>
<span class="line"><span>UC --&gt; SSO : 返回权限列表</span></span>
<span class="line"><span>SSO -&gt; Redis : 存储 auth:uid 权限信息</span></span>
<span class="line"><span>SSO --&gt; User : 返回 Token</span></span>
<span class="line"><span></span></span>
<span class="line"><span>== 接口访问鉴权 ==</span></span>
<span class="line"><span>User -&gt; Gateway : 请求业务接口 (携带Token)</span></span>
<span class="line"><span>Gateway -&gt; Redis : 查询 token:xxx 是否存在</span></span>
<span class="line"><span>alt Token 有效</span></span>
<span class="line"><span>    Gateway -&gt; Redis : 查询 auth:uid 是否存在</span></span>
<span class="line"><span>    alt 权限存在</span></span>
<span class="line"><span>        Gateway -&gt; Biz : 转发请求</span></span>
<span class="line"><span>        Biz --&gt; User : 返回业务响应</span></span>
<span class="line"><span>    else 权限不存在</span></span>
<span class="line"><span>        Gateway --&gt; User : 403 Forbidden</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span>else Token 无效</span></span>
<span class="line"><span>    Gateway --&gt; User : 401 Unauthorized</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span>@enduml</span></span></code></pre></div>`,16))])}const D=i(d,[["render",r]]);export{A as __pageData,D as default};
