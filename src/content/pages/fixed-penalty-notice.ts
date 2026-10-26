import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'fixed-penalty-notice',
  group: 'ticket',
  order: 14,
  tool: { kind: 'ticket', props: { issuer: 'police' } },
  mini: { kind: 'mini:scotfpn' },
  related: ['pcn-vs-parking-charge-notice', 'penalty-charge-notice', 'scotland-parking-fines', 'pcn-fine-amounts'],
  sources: ['govuk_tickets', 'scot_levels'],
  demarche: true,
  en: {
    slug: 'fixed-penalty-notice',
    nav: 'Police Fixed Penalty Notice',
    card: 'A parking ticket from the police is a criminal fixed penalty, not a council PCN: what it means, what it costs late and why it cannot be appealed the same way.',
    title: 'Fixed Penalty Notice for Parking: Police Tickets Explained',
    description: 'A police Fixed Penalty Notice for parking is a criminal matter, not a council PCN. See what it costs if paid late, how to ask for a hearing and why it differs.',
    h1: 'Fixed Penalty Notice for parking: a police ticket',
    intro: 'Confirm with the checker that the notice comes from the police: it sets out what kind of penalty it is and what happens if the time to pay runs out.',
    resume: (h) => `A Fixed Penalty Notice is the ticket a police officer, or a traffic warden working for the police, gives for a parking offence. It belongs to criminal law: the notice offers you the chance to settle the matter by paying a fixed sum instead of being prosecuted in a magistrates' court or, in Scotland, a sheriff court. That makes it very different from a council Penalty Charge Notice, which is a civil penalty with an informal challenge, formal representations and an independent adjudicator, and from a private Parking Charge Notice, which is a contract claim. GOV.UK explains that if you do not pay a fixed penalty within 28 days you may have to pay half as much again, or be taken to court. In Scotland, Transport Scotland's parking report gives the police parking fixed penalty as ${h.gbp(h.S.policeFpn)}, rising to ${h.gbp(h.S.policeFpnLate)} if it is not paid in time. Since most parking in Britain is now enforced by councils, police tickets are rarer, but the stakes of ignoring one are higher.`,
    faqs: (h) => [
      { q: 'Can I appeal a police parking ticket like a council PCN?', a: 'Not in the same way. There is no informal challenge to a council, no formal representations and no parking adjudicator. If you dispute a fixed penalty, the route is to decline it and ask for the matter to go to court, as the notice explains. A court then decides whether the offence was committed, which carries more risk than a civil appeal.' },
      { q: 'What does a Fixed Penalty Notice cost if I pay it late?', a: `GOV.UK says that if you do not pay within 28 days you may have to pay 50% more or go to court. In Scotland the police parking penalty of ${h.gbp(h.S.policeFpn)} becomes ${h.gbp(h.S.policeFpnLate)} if unpaid in time. The notice you hold gives the exact sum, the date by which to pay and the address of the fixed penalty office.` },
      { q: 'Why would the police give a parking ticket when councils enforce parking?', a: 'Councils run civil enforcement in most of Britain, so most parking tickets are now council penalties. The police keep powers for matters that remain criminal and can act where a council does not enforce. If your notice is headed Fixed Penalty Notice and names a police force, the police rules apply, whatever the street or car park.' },
    ],
    body: (h) => `
<h2>Three tickets, three legal systems</h2>
${h.table(['', 'Police Fixed Penalty Notice', 'Council Penalty Charge Notice', 'Private Parking Charge Notice'], [
  ['Nature', 'criminal, offered instead of prosecution', 'civil penalty set by law', 'claim under contract'],
  ['Who issues', 'a police officer or police traffic warden', 'a council civil enforcement officer or camera', 'a parking company'],
  ['If unpaid', 'may rise by 50% or go to court (GOV.UK)', `charge certificate, +${h.E.surchargePct}%, court registration`, 'debt letters, possible county court claim'],
  ['To dispute it', 'ask for a court hearing', 'challenge, representations, adjudicator', 'operator, then POPLA or IAS'],
], `Source: ${h.src('govuk_tickets', 'GOV.UK: parking tickets')}.`, ['l', 'l', 'l', 'l'])}
<p>The checker at the top of the page sorts the notice into one of these columns from the heading and the issuer. If it says police, everything below applies; if it says council, read our ${h.a('penalty-charge-notice', 'Penalty Charge Notice guide')} instead.</p>

<h2>Paying, or asking for a hearing</h2>
<p>A fixed penalty gives you a choice. Paying the sum within the time on the notice ends the matter: no court, and for a non-endorsable parking offence no points on your licence. Declining it means the police may prosecute, and a court decides. There is no middle path of writing to explain the circumstances and hoping for cancellation, as there is with a council, although the notice or the fixed penalty office can tell you whether the force accepts representations. Read the back of the notice carefully: it states how to pay, how to ask for a hearing and by when.</p>
<p>Because the court route can lead to a fine set by the court plus costs, it suits cases where you have clear evidence that no offence was committed. For a doubtful case, many people pay within the time to avoid the uplift.</p>

<h2>The cost of waiting</h2>
<p>The main trap is time. GOV.UK warns that missing the 28 days can mean paying 50% more. In Scotland the figures are set out in Transport Scotland's report on decriminalised parking enforcement: ${h.gbp(h.S.policeFpn)} on time, ${h.gbp(h.S.policeFpnLate)} late (${h.src('scot_levels', 'Transport Scotland DPE report 2024-25')}). Use the mini-tool above to compare the two. For a notice issued on ${h.date('2026-11-09')}, 28 days take you to early December: put the date in your diary the day you receive it.</p>

<h2>Scotland: police and council tickets side by side</h2>
<p>Scottish councils that run decriminalised parking enforcement issue Penalty Charge Notices of up to ${h.gbp(h.S.max)}, halved within ${h.S.discountDays} days. In areas without it, parking is still a matter for Police Scotland. Two drivers parked on the same type of yellow line in two Scottish towns can therefore receive two different kinds of ticket. Our ${h.a('scotland-parking-fines', 'Scotland page')} lists how each works.</p>

<h2>What we can and cannot tell you</h2>
<p>This page explains the categories so that you know which rules to read. It does not cover driving offences such as speeding, and it does not advise on whether to contest a prosecution. The police force named on the notice, and the court if you ask for a hearing, are the only places where your case is decided.</p>`,
  },
});
