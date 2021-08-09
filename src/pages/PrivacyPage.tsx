import React, { useEffect } from 'react';
import { setDocumentTitle } from '../utilities/DocumentTitle';
import ArticleInner from '../components/ArticleInner';
import ArticleSectionContent from '../components/ArticleSectionContent';
import ArticleSection from '../components/ArticleSection';

const PrivacyPage: React.FC = () => {
  useEffect(() => {
    setDocumentTitle('プライバシーポリシー');
  }, []);

  return (
    <ArticleInner>
      <h1>プライバシーポリシー</h1>

      <p>本サービスは、以下のプライバシーポリシーを定め、適切な個人情報の保護に努めます。</p>

      <ArticleSection wider={true}>
        <ArticleSectionContent>
          <h2>第1条（プライバシー情報の定義）</h2>
          <p>
            プライバシー情報のうち「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、連絡先その他の記述等により特定の個人を識別できる情報を指します。
          </p>
          <p>
            プライバシー情報のうち「サービス利用情報」とは、ご利用いただいたサービスやご覧になったページ、広告の履歴、登録ユーザーが検索された検索キーワード、ご利用日時、ご利用の方法、ご利用環境、ユーザーのIPアドレス、端末の個体識別情報などを指します。
          </p>
        </ArticleSectionContent>
      </ArticleSection>

      <ArticleSection wider={true}>
        <ArticleSectionContent>
          <h2>第2条（プライバシー情報の収集方法）</h2>
          <p>
            本サービスは、利便性の向上のため、登録ユーザーについて、利用したサービスやソフトウエア、閲覧したページや広告の履歴、検索した検索キーワード、利用日時、利用方法、利用環境（携帯端末を通じてご利用の場合の当該端末の通信状態、利用に際しての各種設定情報なども含みます）、IPアドレスなどのサービス利用情報を、ユーザーが本サービスや提携先のサービスを利用し、またはページを閲覧する際に収集します。
          </p>
        </ArticleSectionContent>
      </ArticleSection>

      <ArticleSection wider={true}>
        <ArticleSectionContent>
          <h2>第3条（プライバシー情報を収集・利用する目的）</h2>
          <p>
            本サービスを利用するために、または本サービスの利用を通してユーザーからご提供いただく情報は以下のとおりです。
          </p>
          <ol>
            <li>
              メールアドレス、当該外部サービスでユーザーが利用するID及び当該外部サービスのプライバシー設定によりユーザーが連携先に開示を認めた情報
            </li>
            <li>入力フォームその他本サービスが定める方法を通じてユーザーが入力または送信する情報</li>
            <li>アクセス情報やご利用方法に関するサービス利用情報</li>
          </ol>
          <p>本サービスにおいて個人情報を収集・利用する目的は、以下のとおりです。</p>
          <ol>
            <li>登録ユーザーにお知らせや連絡をするため</li>
            <li>登録ユーザーからのお問い合わせに対応するため</li>
            <li>表示及び効果測定のため</li>
            <li>ユーザーのトラフィック測定及び行動測定のため</li>
            <li>その他上記の利用目的に付随する目的</li>
          </ol>
        </ArticleSectionContent>
      </ArticleSection>

      <ArticleSection wider={true}>
        <ArticleSectionContent>
          <h2>第4条（個人情報の第三者提供）</h2>
          <p>
            当方は、プライバシー情報のうち個人情報については、あらかじめユーザーの同意を得ないで、第三者（日本国外にある者を含みます。）に提供しません。
          </p>
          <ol>
            <li>第3条の定めに従って、提携先または情報収集サービス提供者へ個人情報が提供される場合</li>
            <li>
              国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、ユーザーの同意を得ることによって当該事務の遂行に支障を及ぼすおそれがある場合
            </li>
            <li>
              その他、個人情報の保護に関する法律（以下「個人情報保護法」といいます。）その他の法令で認められる場合
            </li>
          </ol>
        </ArticleSectionContent>
      </ArticleSection>

      <ArticleSection wider={true}>
        <ArticleSectionContent>
          <h2>第5条（プライバシーポリシーの変更）</h2>
          <p>
            本ポリシーの内容は、登録ユーザーに通知することなく、変更できるものとします。運営者が別途定める場合を除いて、変更後のプライバシーポリシーは、本ページに掲載したときから効力を生じるものとします。
          </p>
        </ArticleSectionContent>
      </ArticleSection>

      <ArticleSection wider={true}>
        <ArticleSectionContent>
          <h2>第6条（お問い合わせ窓口）</h2>
          <p>本ポリシーに関するお問い合わせは、下記の窓口までお願いいたします。</p>
          <p>
            Eメールアドレス: <strong>poiyo.app(a)gmail.com</strong>
          </p>
          <p>
            <strong>(a)</strong>は<strong>@</strong>に置き換えてください。
          </p>
        </ArticleSectionContent>
      </ArticleSection>

      <p>
        [制定] <time>2021年2月12日</time>
      </p>
    </ArticleInner>
  );
};

export default PrivacyPage;
