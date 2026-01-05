---
title: MDVR (XPAD) Amplifier Description
author: Sean Mao
keywords:
- 问题处理步骤
- 说明
- Business,Enterprise,FAE,Technical Support
- 海外营销中心-欧洲战区-土耳其区
- 仅内部使用
vlook-welcome: Streamax
vlook-header-autonum: h1{{Chapter ###. }},h2{{Chapter ###. }},h3{{Chapter ###. }},h4{{Chapter ###. }},h5{{Chapter ###. }}
layout: default
vlook-query: coating=bu&ws=3&toc=3
vlook-header-dup: 
---

###### ✒️MDVR (XPAD) Amplifier Description<br />*Version 1.0`🐾`09th December*<br />*一般`👀`部门可见*<br />**** <br />[✉️](mailto:sean@streamax.com)<br />**Sean°Mao**<br>*赫尔新根默斯肯的肥皂泡*

> [!IMPORTANT]
>
> 1. The amplifier power of MDVR (XPAD) is 20W/4 ohms, so the constant sinusoidal voltage \( U²=P·R=20×4=80V² \)
> 2. The 4Ω of XPAD is the `nominal optimal load`. For long-term reliability, keep each channel load at ≥4Ω
> 3. The recommended configuration is: total impedance = 4Ω, speaker power ≥ 20W, quantity = 8. _~RdGnBu~_

# MDVR (XPAD) Amplifier Description

[TOC]

## XPAD Specification

[<kbd>Click here to download XPAD Specification</kbd>](https://wj.streamax.com:9443/outpublish.html?code=Aac1d93ee36c646c4a0db9f6edfbe6eb8&lang=zh-cn#view)

## Power matching principle

1. The output power of MDVR (XPAD) amplifier can be less than the speaker power
2. The output power of MDVR (XPAD) amplifier can be equal to the speaker power, allowing maximum volume
3. The output power of MDVR (XPAD) amplifier must not exceed the speaker power, otherwise it will cause device damage

## Power Matching Calculation Examples
_^Tab^_
> **Example 1**
>
> ---
>
> - Description
>
>   - Speaker configuration: 4 *25W`8Ω`* speakers (total impedance after connection is 8Ω)
>   - Total impedance: 8 ohms
>   - MDVR (XPAD) output amplifier power: \( P=U²/R=80/8=10W \)
>   - Matching result: The maximum speaker power is 25W, which complies with Principle 1, but the sound volume will be relatively low
>
> - Example Diagram-1
>
>   <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=556 height=366 src="https://edrawcloudpublicus.s3.amazonaws.com/viewer/self/2539370/share/2025-12-9/1765251494/page-5.svg"></iframe>

> **Example 2<a id="example2"></a>**
>
> ---
>
> - Description
>
>   - Speaker configuration: 8 *25W`8Ω`* speakers (total impedance after grouped connection is 4Ω)
>   - Total impedance: 4 ohms
>   - MDVR (XPAD) output amplifier power: \( P=U²/R=80/4=20W \)
>   - Matching result: The maximum speaker power is 25W, which complies with Principle 2
>
>   > [!CAUTION]
>   >
>   > The transient power of the amplifier can reach 25W
>
> - Example Diagram-2
>
>   <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=677 height=638 src="https://edrawcloudpublicus.s3.amazonaws.com/viewer/self/2539370/share/2025-12-9/1765251494/page-6.svg"></iframe>



## Customer Requirements & Questions

**Requirements**

> 1. We plan to use 10 pieces of *10W`8 Ω`* speakers in the project.
> 2. We will use these only for internal speakers. We will not use external speakers. Therefore, we will need to connect all 10 speakers to the internal speaker output.

**Questions**

_^Tab^_

> **Connection Scheme: 2-Series & 5-Parallel (3.2 ohms)**
>
> #### Diagram-1
>
> <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=661 height=661 src="https://edrawcloudpublicus.s3.amazonaws.com/viewer/self/2539370/share/2025-12-9/1765251494/page-3.svg"></iframe>
>
> #### Calculation Process-1
>
> 1. **General formula for the equivalent resistance of a parallel circuit** →  \(\frac{1}{R_{\text{total}}} = \frac{1}{R_1} + \frac{1}{R_2} + \dots + \frac{1}{R_n}\)
> 2. **Substitution calculation for this problem (5 resistors of 16Ω in parallel)** → \(\frac{1}{R_{\text{total}}} = \frac{1}{16} + \frac{1}{16} + \frac{1}{16} + \frac{1}{16} + \frac{1}{16} = \frac{5}{16}\)
> 3. **Calculation of total equivalent resistance** → \(R_{\text{total}} = \frac{16}{5} = 3.2\,\Omega\)
>
> #### Refer to [<kbd>Power Matching Principle</kbd>](#Power-Matching-Principle)
>
> MDVR (XPAD) output amplifier power: \( P=U²/R=80/3.2=25W \)
>
> MDVR (XPAD) output amplifier power (25W) > Speaker power (10W), which poses the risk of burning the speakers or damaging the MDVR (XPAD). This scheme is not recommended.

> **Connection Scheme: 2-Series & 3-Series (Parallel Combination, 4.8 ohms)**
>
> #### Diagram-2
>
> <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=745 height=677 src="https://edrawcloudpublicus.s3.amazonaws.com/viewer/self/2539370/share/2025-12-9/1765251494/page-4.svg"></iframe>
>
> #### Calculation Process-2
>
> 1. **Construct 9.6Ω sub-units (5×8Ω speakers per sub-unit)**：
>
>    - Sub-unit internal structure:
>
>      - String 1: 2×8Ω speakers in series → \(R_1 = 8+8 = 16\,\Omega\)
>      - String 2: 3×8Ω speakers in series → \(R_2 = 8+8+8 = 24\,\Omega\)
>
>    - Parallel String 1 and String 2 to obtain sub-unit resistance:
>
>      * \(R_{\text{sub1}} = \frac{R_1 \times R_2}{R_1 + R_2} = \frac{16 \times 24}{16 + 24} = 9.6\,\Omega\)
>
>      * \(R_{\text{sub2}} = \frac{R_3 \times R_4}{R_3 + R_4} = \frac{16 \times 24}{16 + 24} = 9.6\,\Omega\)
>
> 2. **Final circuit connection**：
>
>    Connect two identical 9.6Ω sub-units **in parallel** → Total resistance:
>
>    \(R_{\text{final}} = \frac{9.6 \times 9.6}{9.6 + 9.6} = 4.8\,\Omega\)
>
> #### Refer to [<kbd>Power Matching Principle</kbd>](#Power-Matching-Principle)
>
> MDVR (XPAD) output amplifier power: \( P=U²/R=80/4.8≈16.67W \)
>
> MDVR (XPAD) output amplifier power (16.67W) > Speaker power (10W), which poses the risk of burning the speakers or damaging the MDVR (XPAD). This scheme is not recommended.

## Streamax Recommendations

> [!WARNING]
>
> 1. The optimal state is when speaker power ≥20W and impedance =4Ω, recommended ✅️
> 2. Using 10W speakers may cause risks to both the speakers and MDVR (XPAD), not recommended ❌️
> 3. Using 10W speakers may cause low volume problem, not recommended ❌️
> 4. You can refer to the case in [Example 2](#example2) for configuration: 8 pcs *25W`8Ω`* speakers (total impedance after grouped connection is 4Ω)



#  Thanks for watching!