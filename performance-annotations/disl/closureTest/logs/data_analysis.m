clear all;
clc;

% LOAD NECESSARY .DAT FILES
load(fullfile('.','LineNumberTable','computeLineStartOffsets.dat'));
load(fullfile('.','LineNumberTable','getLine.dat'));
load(fullfile('.','LineNumberTable','getSourcePosition.dat'));
load(fullfile('.','IRFactory','validateLabel.dat'));
load(fullfile('.','IRFactory','validateParameters.dat'));
load(fullfile('.','JsDocInfoParser','checkExtendedTypes.dat'));
load(fullfile('.','JsDocInfoParser','recordTypeNode.dat'));
load(fullfile('.','NodeTraversal','pushScope.dat'));
load(fullfile('.','NodeTraversal','traverse.dat'));
load(fullfile('.','NodeTraversal','traverseBranch.dat'));
load(fullfile('.','NodeTraversal','traverseChildren.dat'));
load(fullfile('.','NodeTraversal','traverseEs6.dat'));
load(fullfile('.','Scanner','peekToken.dat'));

% COMPUTE COVARIANCE
c1 = cov(computeLineStartOffsets);
c2 = cov(getLine);
c3 = cov(getSourcePosition);
c4 = cov(validateLabel);
c5 = cov(validateParameters);
c6 = cov(checkExtendedTypes);
c7 = cov(recordTypeNode);
c8 = cov(pushScope);
c9 = cov(traverse);
c10 = cov(traverseBranch);
c11 = cov(traverseChildren);
c12 = cov(traverseEs6);
c13 = cov(peekToken);

% PLOT THE COVARIANCES
figure
plot(c1);
figure
plot(c2);
figure
plot(c3);
figure
plot(c4);
figure
plot(c5);
figure
plot(c6);
figure
plot(c7);
figure
plot(c8);
figure
plot(c9);
figure
plot(c10);
figure
plot(c11);
figure
plot(c12);
figure
plot(c13);

% 