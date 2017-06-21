clear all;
clc;

% LINE NUMBER TABLE

% LOAD NECESSARY .DAT FILES
A = load(fullfile('./logs','pcc','setInputID2.dat'));
B = load(fullfile('./logs','LineNumberTable','getLine.dat'));
C = load(fullfile('./logs','LineNumberTable','getSourcePosition.dat'));


% Correlations
PCC = corrcoef(A(:,1),A(:,2));
PCC(2)
corr(B(:,1),B(:,2)); % does not seem to correlate well
corr(C(:,1),C(:,2)); % does not seem to correlate well

% figure
scatter(A(:,1),A(:,2),40,'MarkerEdgeColor',[.5 0.4 .8],...
              'MarkerFaceColor',[.5 0.4 .8],...
              'MarkerFaceAlpha',0.3,...
              'MarkerEdgeAlpha',0.4,...
              'LineWidth',1.5)
grid on
title('com/google/javascript/rhino/Node.setInputId');
xlabel('feature values') % x-axis label
ylabel('execution time (nanoseconds)') % y-axis label
legend('child node count')
